import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import * as helper from 'groupPlan.helper'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-enterprise'

class GroupPlan extends Component {
  constructor (props) {
    super(props)

    this.state = {
      columnDefs: helper.getColumnDefs(),
      rowData: [],
      rowSelection: 'multiple'
    }
  }

  onGridReady (params) {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    params.api.sizeColumnsToFit()

  }

  render () {
    return (
      <div style={{
        width: '100%',
        height: '100%',

        paddingTop: '5px',
        boxSizing: 'border-box'
      }}>
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100',
            paddingTop: '50px'
          }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            animateRows={true}
            enableColResize={true}
            rowData={this.state.rowData}
            deltaRowDataMode={true}
            enableGroupEdit={true}
            onGridReady={this.onGridReady.bind(this)}
            rowSelection={this.state.rowSelection}
          />
        </div>
      </div>
    )
  }
}

export default GroupPlan
