import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import * as helper from './loadChair.helper'
import { COLUMN } from './loadChair.constants'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-enterprise'
import { EMPTY } from '../educationalPlan/educationalPlan.constants'
import Fetcher from '../../lib/api'

class LoadChair extends Component {
  constructor (props) {
    super(props)

    const topOptions = {alignedGrids: [], suppressHorizontalScroll: true}
    const bottomOptions = {alignedGrids: []}

    topOptions.alignedGrids.push(bottomOptions)
    bottomOptions.alignedGrids.push(topOptions)

    this.state = {
      columnDefs: helper.getColumnDefs(),
      rowData: [],

      topOptions,
      bottomOptions,
      selectedClassifier: '',
      classifiers: [],
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

  getClassifiers = () => {
    Fetcher.classifiers.getDistinctClassifiersRows()
      .then(res => res.json())
      .then(classifiers => this.setState({classifiers}))
  }

  onGridReady (params) {
    this.topGrid = params
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
    this.getClassifiers()
  }

  getAllRows = () => {
    let rowData = []
    this.gridApi.forEachNode(node => {
      rowData.push(node.data)
    })
    return rowData
  }

  handledSelectChange = e => {
    this.setState(
      {selectedClassifier: e.target.value},
      () => {
        const selectedData = this.getAllRows()
        this.gridApi.updateRowData({remove: selectedData})

        helper.getLoadChair(this.state.selectedClassifier)
          .then(addedRow => this.setState({addedRow}))
          .then(() => {
            this.gridApi.updateRowData({add: [...this.state.addedRow]})
          })
      }
    )
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
          <h4>Ուսումնական Պլան դասիչ
            <select name="selecting" id="selectID" onChange={this.handledSelectChange}>
              <option value={EMPTY}/>
              {this.state.classifiers.map(row => (<option value={row} key={row}>{row}</option>))}
            </select>
          </h4>

          <h2>Ամբիոնի բեռնվածք</h2>
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
