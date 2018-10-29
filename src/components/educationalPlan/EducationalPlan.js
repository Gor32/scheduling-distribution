import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import 'ag-grid-enterprise'

import './educationalPlan.style.css'

import * as helper from './educationalPlan.helper'

class EducationalPlan extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columnDefs: helper.columnDefs,
      rowData: helper.rowData,
      rowSelection: 'multiple',
      getRowHeight: helper.getRowHeight,
    }
  }

  onGridReady (params) {
    params.api.sizeColumnsToFit()
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
