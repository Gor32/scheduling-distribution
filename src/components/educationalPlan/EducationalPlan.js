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
      values: {...helper.VALUES},
      addedRow: []
    }
    this.handledTextChange = this.handledTextChange.bind(this)
    this.onAddRow = this.onAddRow.bind(this)
    this.createNewRowData = this.createNewRowData.bind(this)
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

  handledTextChange (column) {
    return (e) => {
      const values = this.state.values
      values[column] = e.target.value
      this.setState({values})
      console.log(values)
    }
  }

  createNewRowData () {
    return {
      row: {...this.state.values},
      exam: []
    }
  }

  onAddRow () {
    const newItem = this.createNewRowData()
    Fetcher.createEducationalRow(newItem.row)
      .then(row => {
        const addedRow = this.state.addedRow
        addedRow.push(row.createdRow)
        this.setState({addedRow})
        console.log(addedRow)
      })
    const rowData = this.state.rowData.slice()
    Object.values(helper.SEMESTERS)
      .map((semester) =>
        rowData[2][semester] += helper.calculateSemesters(newItem.row[semester], newItem, semester) || 0)
    this.gridApi.updateRowData({add: [newItem.row]})
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
          <div style={{position: 'absolute', top: '0px', left: '0px'}}>
            <div>
              {/*<button onClick={this.onRemoveSelected.bind(this)}>Remove Selected</button>*/}
              <input type="text" placeholder="digit" onChange={this.handledTextChange(helper.COLUMN.DIGIT)}/>
              <input type="text" placeholder="courses" onChange={this.handledTextChange(helper.COLUMN.COURSES)}/>
              <input type="text" placeholder="semester1" onChange={this.handledTextChange(helper.COLUMN.SEMESTER1)}/>
              <input type="text" placeholder="semester2" onChange={this.handledTextChange(helper.COLUMN.SEMESTER2)}/>
              <input type="text" placeholder="semester3" onChange={this.handledTextChange(helper.COLUMN.SEMESTER3)}/>
              <input type="text" placeholder="semester4" onChange={this.handledTextChange(helper.COLUMN.SEMESTER4)}/>
              <input type="text" placeholder="semester5" onChange={this.handledTextChange(helper.COLUMN.SEMESTER5)}/>
              <input type="text" placeholder="semester6" onChange={this.handledTextChange(helper.COLUMN.SEMESTER6)}/>
              <input type="text" placeholder="semester7" onChange={this.handledTextChange(helper.COLUMN.SEMESTER7)}/>
              <input type="text" placeholder="semester8" onChange={this.handledTextChange(helper.COLUMN.SEMESTER8)}/>
              <button onClick={this.onAddRow.bind(this)}>Add Row</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EducationalPlan
