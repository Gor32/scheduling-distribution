import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import './educationalPlan.style.css'

import 'ag-grid-enterprise'

import * as helper from './educationalPlan.helper'

import {
  OK,
  EMPTY,
  COLUMN,
  VALUES,
  SEMESTERS,
  ENDING_CAPTIONS_INDEX,
} from './educationalPlan.constants'

import Fetcher from '../../lib/api'

class EducationalPlan extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columnDefs: helper.getColumnDefs(),
      rowData: helper.getRowData(),
      rowSelection: 'multiple',
      getRowHeight: helper.getRowHeight,
      values: {...VALUES},
      addedRow: [],
      removedRows: [],
      classifiers: [],
      selectedClassifier: EMPTY
    }
  }

  onGridReady = params => {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
    Fetcher.classifiers.getDistinctClassifiersRows()
      .then(res => res.json())
      .then(classifiers => this.setState({classifiers}))
      .then(() => {console.log(this.state.classifiers)})
    //this.getEducationalRows()
  }

  getEducationalRows = classifier => {
    Fetcher.educationalData.getEducationalRowsByClassifier(classifier)
      .then(res => res.json())
      .then(addedRow => this.setState({addedRow}))
      .then(() => {
        this.gridApi.updateRowData({add: [...this.state.addedRow]})
        this.state.addedRow.forEach(r => this.calculateSemestersNodeWithoutAdditionalData(r, true))
        this.gridApi.updateRowData({})
      })
  }

  handledTextChange = column => {
    return (e) => {
      const values = this.state.values
      values[column] = e.target.value
      this.setState({values})
      console.log(values)
    }
  }

  handledSelectChange = e => {
    this.setState({selectedClassifier: e.target.value})
    const selectedData = this.getAllRows()
    this.gridApi.updateRowData({remove: selectedData})
    this.selectedClassifierAddedDataToGrid(e.target.value)
  }

  selectedClassifierAddedDataToGrid = value => {
    if (value !== EMPTY) {
      const rowData = this.state.rowData.slice()
      Object.values(SEMESTERS)
        .forEach((semester) =>
          rowData[2][semester] = 0)
      this.getEducationalRows(value)
    }
  }

  getAllRows = () => {
    let rowData = []
    this.gridApi.forEachNode((node, index) => {
      if (index > ENDING_CAPTIONS_INDEX)
        rowData.push(node.data)
    })
    return rowData
  }

  createNewRowData = () => {
    return {
      row: {...this.state.values},
      exam: []
    }
  }

  onAddRow = () => {
    const newItem = this.createNewRowData()
    this.addRowInState(newItem.row)
    this.calculateSemestersNodeWithAdditionalData(newItem, true)
    this.gridApi.updateRowData({add: [newItem.row]})
  }

  calculateSemestersNodeWithAdditionalData = (item, isPlus) => {
    const rowData = this.state.rowData.slice()
    Object.values(SEMESTERS)
      .forEach((semester) =>
        rowData[2][semester] += helper.calculateSemestersWithAdditionalData(item.row[semester], item, semester, isPlus) || 0)
  }

  calculateSemestersNodeWithoutAdditionalData = (item, isPlus) => {
    const rowData = this.state.rowData.slice()
    Object.values(SEMESTERS)
      .forEach((semester) =>
        rowData[2][semester] += helper.calculateSemestersWithoutAdditionalData(item[semester], item, semester, isPlus) || 0)
  }

  addRowInState = row => {
    Fetcher.educationalData.createEducationalRow({...row, classifier: this.state.selectedClassifier})
      .then(r => {
        this.state.addedRow.push(r.createdRow)
        row._id = r.createdRow._id
      })
  }

  onRemoveSelected = () => {
    const selectedData = this.gridApi.getSelectedRows().filter(row => row.cantRemove !== true)
    const gridApiRows = this.gridApi.updateRowData({remove: selectedData})
    this.chooseData(gridApiRows.remove)
    this.removingData()
  }

  removingData = () => {
    const realRemoved = []
    this.state.removedRows
      .forEach(row =>
        Fetcher.educationalData.removeEducationalRow(row.data._id).then(r => {
          if (r.ok === OK) {
            realRemoved.push(row.data._id)
            this.calculateSemestersNodeWithoutAdditionalData(row.data, false)
          }
        }).then(() => {
          this.filterAddedAndRemovedState(realRemoved)
          this.gridApi.updateRowData({})
        }))
  }

  filterAddedAndRemovedState = row => {
    const addedRow = this.state.addedRow.filter(r => row.indexOf(r._id) === -1)
    const removedRows = this.state.removedRows.filter(r => row.indexOf(r.data._id) === -1)
    this.setState({addedRow, removedRows})
  }

  chooseData = removedRows => {
    removedRows.forEach(rowNode => {
      if (rowNode.rowIndex > ENDING_CAPTIONS_INDEX) {
        this.state.removedRows.push(rowNode)
      }
    })
  }

  render () {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        paddingTop: '5px',
        boxSizing: 'border-box'
      }}
      >
        <div>
          {
            Object.keys(COLUMN)
              .map(row => (<input type="text" placeholder={COLUMN[row]} key={COLUMN[row]}
                                  onChange={this.handledTextChange(COLUMN[row])}/>))
          }
          <button onClick={this.onAddRow}>Add Row</button>
          <hr/>
          <button onClick={this.onRemoveSelected}>Remove Selected</button>
        </div>
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100',
            paddingTop: '50px'
          }}
        >
          <h2>Ուսումնական Պլան դասիչ
            <select name="selecting" id="selectID" onChange={this.handledSelectChange}>
              <option value={EMPTY}/>
              {this.state.classifiers.map(row => (<option value={row} key={row}>{row}</option>))}
            </select>

          </h2>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            animateRows={true}
            enableColResize={true}
            rowData={this.state.rowData}
            enableGroupEdit={true}
            deltaRowDataMode={true}
            rowSelection={this.state.rowSelection}
            getRowHeight={this.state.getRowHeight}
            onGridReady={this.onGridReady}
          >
          </AgGridReact>
        </div>
      </div>
    )
  }
}

export default EducationalPlan
