import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import './educationalPlan.style.css'

import 'ag-grid-enterprise'

import * as helper from './educationalPlan.helper'

import {
  rowData,
  columnDefs,
  OK,
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
      columnDefs: columnDefs,
      rowData: rowData,
      rowSelection: 'multiple',
      getRowHeight: helper.getRowHeight,
      values: {...VALUES},
      addedRow: [],
      removedRows: []
    }
  }

  onGridReady = params => {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
    this.getEducationalRows()
  }

  getEducationalRows = () => {
    Fetcher.getEducationalRows()
      .then(res => res.json())
      .then(addedRow => this.setState({addedRow}))
      .then(() => this.gridApi.updateRowData({add: [...this.state.addedRow]}))
  }

  handledTextChange = column => {
    return (e) => {
      const values = this.state.values
      values[column] = e.target.value
      this.setState({values})
      console.log(values)
    }
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
    this.calculateSemestersRow(newItem)
    this.gridApi.updateRowData({add: [newItem.row]})
  }

  calculateSemestersRow = item => {
    const rowData = this.state.rowData.slice()
    Object.values(SEMESTERS)
      .forEach((semester) =>
        rowData[2][semester] += helper.calculateSemesters(item.row[semester], item, semester) || 0)
  }

  addRowInState = row => {
    Fetcher.createEducationalRow(row)
      .then(r => {
        this.state.addedRow.push(r.createdRow)
      })
  }

  onRemoveSelected = () => {
    const selectedData = this.gridApi.getSelectedRows()
    const gridApiRows = this.gridApi.updateRowData({remove: selectedData})

    this.chooseData(gridApiRows.remove)
    this.removingData()
  }

  removingData = () => {
    const realRemoved = []
    this.state.removedRows
      .forEach(row =>
        Fetcher.removeEducationalRow(row.data._id).then(r => {
          if (r.ok === OK) {
            realRemoved.push(row.data._id)
          }
        }).then(() => {
          this.filterAddedAndRemovedState(realRemoved)
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
        paddingTop: '50px',
        boxSizing: 'border-box'
      }}
      >
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100'
          }}
        >
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
          <div style={{position: 'absolute', top: '0px', left: '0px'}}>
            <div>
              <button onClick={this.onRemoveSelected.bind(this)}>Remove Selected</button>
              {
                Object.keys(COLUMN)
                  .map(row => (<input type="text" placeholder={COLUMN[row]}
                                      onChange={this.handledTextChange(COLUMN[row])}/>))
              }
              <button onClick={this.onAddRow.bind(this)}>Add Row</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EducationalPlan
