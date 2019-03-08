import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import * as helper from './groupPlan.helper'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-enterprise'
import Fetcher from '../../lib/api'
import { EMPTY } from '../educationalPlan/educationalPlan.constants'
import { gridLocaleText } from '../../util'

class GroupPlan extends Component {
  constructor (props) {
    super(props)

    this.state = {
      columnDefs: helper.getColumnDefs(),
      rowData: [],
      classifiers: [],
      showZero: ['Ցույց տալ զրոնները', 'Ցույց չտալ զրոնները'],
      selectedShowZero: false,
      selectedClassifier: '',
      rowSelection: 'multiple',
      localeText: gridLocaleText
    }
  }

  getClassifiers = () => {
    Fetcher.classifiers.getDistinctClassifiersRows()
      .then(res => res.json())
      .then(classifiers => this.setState({classifiers}))
      .then(() => {console.log(this.state.classifiers)})
  }

  onGridReady (params) {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
    this.getClassifiers()
  }

  handledSelectChange = e => {
    this.setState({selectedClassifier: e.target.value})

    const selectedData = this.getAllRows()
    this.gridApi.updateRowData({remove: selectedData})
    helper.getEducationalPlan(e.target.value)
      .then(rowData => {
          rowData.forEach(row => {
            if (this.state.selectedShowZero) {
              helper.changeRowAfterSelectZero(row, 0, '')
            } else {
              helper.changeRowAfterSelectZero(row, '', 0)
            }
          })
          this.gridApi.updateRowData({add: [...rowData]})
        }
      )
  }

  handledSelectZeroChange = e => {
    if (this.state.selectedClassifier !== '') {
      const selectedData = this.getAllRows()
      this.gridApi.updateRowData({remove: selectedData})
      helper.getEducationalPlan(this.state.selectedClassifier)
        .then(rowData => {
            rowData.forEach(row => {
              if (this.state.selectedShowZero) {
                helper.changeRowAfterSelectZero(row, 0, '')
              } else {
                helper.changeRowAfterSelectZero(row, '', 0)
              }
            })
            this.gridApi.updateRowData({add: [...rowData]})
          }
        )
    }
    this.setState({selectedShowZero: !this.state.selectedShowZero})
  }

  getAllRows = () => {
    let rowData = []
    this.gridApi.forEachNode(node => {
      rowData.push(node.data)
    })
    return rowData
  }

  render () {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        //paddingTop: '5px',
        boxSizing: 'border-box'
      }}>

        <h2>Խմբային պլան</h2>
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100%',
            //paddingTop: '5px'
          }}
        >

          <h4>Ուսումնական պլան դասիչ
            <select name="selecting" id="selectID" onChange={this.handledSelectChange}>
              <option value={EMPTY}/>
              {this.state.classifiers.map(row => (<option value={row} key={row}>{row}</option>))}
            </select>

            <select name="selectingZero" id="selectZeroID" onChange={this.handledSelectZeroChange}>
              {this.state.showZero.map(row => (<option value={row} key={row}>{row}</option>))}
            </select>
          </h4>


          <AgGridReact
            columnDefs={this.state.columnDefs}
            animateRows={true}
            enableColResize={true}
            rowData={this.state.rowData}
            deltaRowDataMode={true}
            enableGroupEdit={true}
            onGridReady={this.onGridReady.bind(this)}
            rowSelection={this.state.rowSelection}
            localeText={this.state.localeText}
          />
        </div>
      </div>
    )
  }
}

export default GroupPlan
