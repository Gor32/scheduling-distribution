import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import './educationalPlan.style.css'

import 'ag-grid-enterprise'

import * as helper from './educationalPlan.helper'
import Fetcher from '../../lib/api'

class EducationalPlan extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columnDefs: helper.columnDefs,
      rowData: helper.rowData,
      rowSelection: 'multiple',
      getRowHeight: helper.getRowHeight,
      addedRow: []
    }
  }

  onGridReady (params) {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
  }

  componentDidMount () {
    Fetcher.getEducationalRows()
      .then(res => res.json())
      .then(addedRow => this.setState({addedRow}, () => console.log(addedRow)))
      .then(() => this.gridApi.updateRowData({add: [...this.state.addedRow]}))
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
            onGridReady={this.onGridReady.bind(this)}
          >
          </AgGridReact>
        </div>
      </div>
    )
  }
}

export default EducationalPlan
