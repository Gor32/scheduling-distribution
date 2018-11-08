import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import 'ag-grid-enterprise'

import * as helper from './classifiers.helper'
import GroupRowInnerRendererForClassifiers from '../groupRowInnerRendererForClassifiers/groupRowInnerRendererForClassifiers'
import { COLUMN, VALUES } from './classifiers.constants'

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
    }
  }

  createNewRowData = () => {
    return {...this.state.values}
  }

  onGridReady = (params) => {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
  }

  onAddRow = () => {
    const newItem = this.createNewRowData()
    this.gridApi.updateRowData({add: [newItem]})
  }

  onRemoveSelected = () => {
    const selectedData = this.gridApi.getSelectedRows()
    this.gridApi.updateRowData({remove: selectedData})
  }

  handledTextChange = column => {
    return (e) => {
      const values = this.state.values
      values[column] = e.target.value
      this.setState({values})
      console.log(values)
    }
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
