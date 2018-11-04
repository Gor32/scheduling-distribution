import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import 'ag-grid-enterprise'

import * as helper from './subjects.helper'

import { columnDefs, COLUMN, VALUES } from './subjects.constants'

class Subjects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columnDefs: columnDefs,
      rowData: [],
      rowSelection: 'multiple',
      values: {...VALUES},
    }
  }

  onGridReady = params => {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
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
    this.gridApi.updateRowData({add: [newItem]})
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
              .map(row => (<input type="text" placeholder={COLUMN[row]}
                                  onChange={this.handledTextChange(COLUMN[row])}/>))
          }
          <button onClick={this.onAddRow}>Add Row</button>
          <hr/>
          <button>Remove Selected</button>
        </div>
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100',
            paddingTop: '50px'
          }}
        >
          <h2>Առարկաներ</h2>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            animateRows={true}
            enableColResize={true}
            rowData={this.state.rowData}
            enableGroupEdit={true}
            deltaRowDataMode={true}
            rowSelection={this.state.rowSelection}
            onGridReady={this.onGridReady}
          >
          </AgGridReact>
        </div>
      </div>
    )
  }
}

export default Subjects
