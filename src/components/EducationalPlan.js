import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import 'ag-grid-enterprise'

class EducationalPlan extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columnDefs:[
        {
          headerName: 'Թվանիշ',
          field: 'digit',
        },
        {
          headerName: 'Դասընթացներ',
          field: 'courses'
        },
        {
          headerName: '1',
          field: 'semester1'
        },
        {
          headerName: '2',
          field: 'semester2'
        },
        {
          headerName: '3',
          field: 'semester3'
        },
        {
          headerName: '4',
          field: 'semester4'
        },
        {
          headerName: '5',
          field: 'semester5'
        },
        {
          headerName: '6',
          field: 'semester6'
        },
        {
          headerName: '7',
          field: 'semester7'
        },
        {
          headerName: '8',
          field: 'semester8'
        }
      ],
      rowData: [],
      rowSelection: 'multiple',


    }
  }

  render () {
    return (
      <div style={{width: '100%', height: '100%', paddingTop: '50px', boxSizing: 'border-box'}}>
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
          >
          </AgGridReact>
        </div>
      </div>
    )
  }
}

export default EducationalPlan
