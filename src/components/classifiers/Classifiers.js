import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import 'ag-grid-enterprise'

import * as helper from './classifiers.helper'
import GroupRowInnerRendererForClassifiers from '../groupRowInnerRendererForClassifiers/groupRowInnerRendererForClassifiers'
import {
  OK,
  COLUMN,
  VALUES,
  ENDING_CAPTIONS_INDEX
} from './classifiers.constants'
import Fetcher from '../../lib/api'

class Classifiers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columnDefs: helper.getColumnDefs(),
      rowData: [],
      frameworkComponents:{groupRowInnerRenderer: GroupRowInnerRendererForClassifiers},
      groupRowInnerRenderer:'groupRowInnerRenderer',
      rowSelection: 'multiple',
      values: {...VALUES},
      addedRow: [],
      removedRows: []
    }
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
    return {...this.state.values}
  }

  onGridReady = (params) => {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
    this.getClassifiersRows()
  }

  getClassifiersRows = () => {
    Fetcher.classifiers.getClassifiersRows()
      .then(res => res.json())
      .then(addedRow => this.setState({addedRow}))
      .then(() => {
        this.gridApi.updateRowData({add: [...this.state.addedRow]})
      })
  }
  onAddRow = () => {
    const newItem = this.createNewRowData()
    this.addRowInState(newItem)
    this.gridApi.updateRowData({add: [newItem]})
  }

  addRowInState = row => {
    Fetcher.classifiers.createClassifiersRow(row)
      .then(r => {
        this.state.addedRow.push(r.createdRow)
        row._id = r.createdRow._id
      })
  }

  onRemoveSelected = () => {
    const selectedData = this.gridApi.getSelectedRows()
    const gridApiRows=this.gridApi.updateRowData({remove: selectedData})
    console.log(gridApiRows)
    this.chooseData(gridApiRows.remove)
    this.removingData()
  }

  removingData = () => {
    const realRemoved = []
    this.state.removedRows
      .forEach(row =>
        Fetcher.classifiers.removeClassifiersRow(row.data._id).then(r => {
          if (r.ok === OK) {
            realRemoved.push(row.data._id)
          }
          console.log(realRemoved)
        }).then(() => {ß
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
        paddingTop: '5px',
        boxSizing: 'border-box'
      }}>
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
          <h2>Դասիչներ</h2>
          <AgGridReact
            enableSorting={true}
            columnDefs={this.state.columnDefs}
            groupUseEntireRow={true}
            frameworkComponents={this.state.frameworkComponents}
            groupRowInnerRenderer={this.state.groupRowInnerRenderer}
            suppressAggFuncInHeader={true}
            deltaRowDataMode={true}
            animateRows={true}
            enableColResize={true}
            onGridReady={this.onGridReady}
            rowSelection={this.state.rowSelection}
            rowData={this.state.rowData}

            enableGroupEdit={true}>
          </AgGridReact>
        </div>
      </div>
    )
  }
}

export default Classifiers
