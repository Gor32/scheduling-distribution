import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import 'ag-grid-enterprise'

import * as helper from './chairs.helper'
import { gridLocaleText } from '../../util'


import {
  OK,
  COLUMN,
  VALUES,
  COLUMN_PLACEHOLDER,
  ENDING_CAPTIONS_INDEX
} from './chairs.constants'
import Fetcher from '../../lib/api'

class Chairs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columnDefs: helper.getColumnDefs(),
      rowData: [],
      rowSelection: 'multiple',
      values: {...VALUES},
      addedRow: [],
      removedRows: [],
      localeText: {}//gridLocaleText
    }
  }

  onGridReady = params => {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
    this.getChairsRows()
  }

  getChairsRows = () => {
    Fetcher.chairs.getChairsRows()
      .then(res => res.json())
      .then(addedRow => this.setState({addedRow}))
      .then(() => {
        this.gridApi.updateRowData({add: [...this.state.addedRow]})
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
  createNewRowData = () => {
    return {...this.state.values}
  }

  onAddRow = () => {
    const newItem = this.createNewRowData()
    this.addRowInState(newItem)
    this.gridApi.updateRowData({add: [newItem]})
  }

  addRowInState = row => {
    Fetcher.chairs.createChairsRow(row)
      .then(r => {
        this.state.addedRow.push(r.createdRow)
        row._id = r.createdRow._id
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
        Fetcher.chairs.removeChairsRow(row.data._id).then(r => {
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
        //paddingTop: '5px',
        boxSizing: 'border-box'
      }}>
        <h2>Ամբիոններ  </h2>
        <div className="mat-label">

        <button onClick={this.onRemoveSelected}>Հեռացնել նշվածները</button>
          <input type="text" placeholder={COLUMN_PLACEHOLDER.CODE} key={COLUMN.CODE}
                             onChange={this.handledTextChange(COLUMN.CODE)}/>
          <input type="text" placeholder={COLUMN_PLACEHOLDER.CHAIR} key={COLUMN.CHAIR}
                             onChange={this.handledTextChange(COLUMN.CHAIR)}/>
          <button onClick={this.onAddRow}>Ավելացնել տող</button>
          
        </div>
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100',
            //paddingTop: '50px'
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
            onGridReady={this.onGridReady}
            localeText={this.state.localeText}
          >
          </AgGridReact>
        </div>
      </div>
    )
  }
}

export default Chairs
