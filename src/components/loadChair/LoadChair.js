import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import * as helper from './loadChair.helper'
import { COLUMN } from './loadChair.constants'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-enterprise'

class LoadChair extends Component {
  constructor (props) {
    super(props)

    const topOptions = {alignedGrids: [], suppressHorizontalScroll: true}
    const bottomOptions = {alignedGrids: []}

    topOptions.alignedGrids.push(bottomOptions)
    bottomOptions.alignedGrids.push(topOptions)

    this.state = {
      columnDefs: helper.getColumnDefs(),
      rowData: [{'subjectName': '12', 'group': '12'},],

      topOptions,
      bottomOptions,
      rowSelection: 'multiple',
      rowGroupPanelShow: 'always',
      addedRow: [],
      bottomData: [
        {
          subjectName: 'Total',
          group: '15 - 61',
        }
      ]
      ,

    }
  }

  onGridReady (params) {
    this.topGrid = params
    this.gridApi = params.api
    helper.getLoadChair("61102")
      .then(addedRow => this.setState({addedRow}))
      .then(() => {
        this.gridApi.updateRowData({add: [...this.state.addedRow]})
      })
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
            boxSizing: 'border-box',
            // height: "100%",
            // width: "100%",
            paddingTop: '50px'
          }}
        >

          <h2>Loading chair</h2>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            animateRows={true}
            enableColResize={true}
            rowData={this.state.rowData}
            deltaRowDataMode={true}
            enableGroupEdit={true}
            onGridReady={this.onGridReady.bind(this)}
            rowSelection={this.state.rowSelection}

            suppressDragLeaveHidesColumns={true}
            suppressMakeColumnVisibleAfterUnGroup={true}
            rowGroupPanelShow={this.state.rowGroupPanelShow}

            gridOptions={this.state.topOptions}
          />
          <div style={{width: '100%', height: '40px'}} className="ag-theme-balham">

            <AgGridReact
              rowData={this.state.bottomData}
              gridOptions={this.state.bottomOptions}
              columnDefs={this.state.columnDefs}
              headerHeight="0"
              rowStyle={{fontWeight: 'bold'}}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default LoadChair
