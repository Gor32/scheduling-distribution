import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import * as helper from './loadChair.helper'
import { COLUMN } from './loadChair.constants'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-enterprise'
import { EMPTY } from '../educationalPlan/educationalPlan.constants'
import Fetcher from '../../lib/api'
import { gridLocaleText } from '../../util'

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
      localeText: gridLocaleText,
      addedRow: [],
      showZero: ['Ցույց տալ զրոնները', 'Ցույց չտալ զրոնները'],
      selectedShowZero: false,
      bottomData: [
        {
          subjectName: '',
          group: 'Ընդհանուր',
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
    this.clearBottomData()
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
          .then(addedRow => {
            addedRow.forEach(row => {
              if (this.state.selectedShowZero) {
                helper.changeRowAfterSelectZero(row, 0, '')
              } else {
                helper.changeRowAfterSelectZero(row, '', 0)
              }
            })
            this.setState({addedRow})
          })
          .then(() => {
            this.gridApi.updateRowData({add: [...this.state.addedRow]})
          })
          .then(() => {
            if (this.state.selectedClassifier !== EMPTY) {
              this.setBottomData()
            } else {
              this.clearBottomData()
            }
          })
      }
    )
  }

  handledSelectZeroChange = e => {
    if (this.state.selectedClassifier !== '') {
      const selectedData = this.getAllRows()
      this.gridApi.updateRowData({remove: selectedData})
      helper.getLoadChair(this.state.selectedClassifier)
        .then(rowData => {
          rowData.forEach(row => {
            if (this.state.selectedShowZero) {
              helper.changeRowAfterSelectZero(row, 0, '')
            } else {
              helper.changeRowAfterSelectZero(row, '', 0)
            }
          })
          this.setState({addedRow: rowData})
        })
        .then(() => {
          this.gridApi.updateRowData({add: [...this.state.addedRow]})
        })
        .then(() => {
          if (this.state.selectedClassifier !== EMPTY) {
            this.setBottomData()
          } else {
            this.clearBottomData()
          }
        })
      // helper.getEducationalPlan(this.state.selectedClassifier)
      //   .then(rowData => {
      //       rowData.forEach(row => {
      //         if (this.state.selectedShowZero) {
      //           helper.changeRowAfterSelectZero(row, 0, '')
      //         } else {
      //           helper.changeRowAfterSelectZero(row, '', 0)
      //         }
      //       })
      //       this.gridApi.updateRowData({add: [...rowData]})
      //     }
      //   )
    }
    this.setState({selectedShowZero: !this.state.selectedShowZero})
  }

  clearBottomData = () => {
    const bottomData = {}
    bottomData[COLUMN.GROUP] = 'Ընդհանուր'
    bottomData[COLUMN.NUMBER_OF_STUDENTS] = 0
    bottomData[COLUMN.PRACTICAL] = 0
    bottomData[COLUMN.LAB] = 0
    bottomData[COLUMN.CONSULTATION] = 0
    bottomData[COLUMN.TESTING] = 0
    bottomData[COLUMN.EXAMINATION] = 0
    bottomData[COLUMN.PRACTICE] = 0
    bottomData[COLUMN.COURSE_WORK] = 0
    bottomData[COLUMN.DIPLOMA] = 0
    bottomData[COLUMN.TOTAL] = 0
    bottomData[COLUMN.LECTURE] = 0
    this.setState({bottomData: [bottomData]})
  }
  setBottomData = () => {
    const bottomData = {}
    bottomData[COLUMN.GROUP] = 'Ընդհանուր'
    bottomData[COLUMN.NUMBER_OF_STUDENTS] = this.aggregationFunction(COLUMN.NUMBER_OF_STUDENTS)
    bottomData[COLUMN.PRACTICAL] = this.aggregationFunction(COLUMN.PRACTICAL)
    bottomData[COLUMN.LAB] = this.aggregationFunction(COLUMN.LAB)
    bottomData[COLUMN.CONSULTATION] = this.aggregationFunction(COLUMN.CONSULTATION)
    bottomData[COLUMN.TESTING] = this.aggregationFunction(COLUMN.TESTING)
    bottomData[COLUMN.EXAMINATION] = this.aggregationFunction(COLUMN.EXAMINATION)
    bottomData[COLUMN.PRACTICE] = this.aggregationFunction(COLUMN.PRACTICE)
    bottomData[COLUMN.COURSE_WORK] = this.aggregationFunction(COLUMN.COURSE_WORK)
    bottomData[COLUMN.DIPLOMA] = this.aggregationFunction(COLUMN.DIPLOMA)
    bottomData[COLUMN.TOTAL] = this.totalAggregationFunction(COLUMN.TOTAL)
    bottomData[COLUMN.LECTURE] = bottomData[COLUMN.TOTAL] - bottomData[COLUMN.DIPLOMA] -
      bottomData[COLUMN.COURSE_WORK] - bottomData[COLUMN.PRACTICE] -
      bottomData[COLUMN.EXAMINATION] - bottomData[COLUMN.TESTING] -
      bottomData[COLUMN.CONSULTATION] - bottomData[COLUMN.LAB] -
      bottomData[COLUMN.PRACTICAL]
    this.setState({bottomData: [bottomData]})
  }

  aggregationFunction = (column) => {
    return this.state.addedRow.reduce((x, y) => {
        const res = {}
        res[column] =
          Number(x[column]) + Number(y[column])
        return res
      }
    )[column]
  }

  totalAggregationFunction = (column) => {
    return this.state.addedRow.reduce((x, y) => {
        const res = {}
        const value = y[column].toString().split('+')
          .map(row => row.trim())
          .map(row => {
            const val = row.split('/')
            if (val.length === 1) return Number(val[0])
            return Number(val[0]) / Number(val[1])
          })
          .reduce((a, b) => a + b, 0)
        res[column] =
          Number(x[column]) + value
        return res
      },{total:0}
    )[column]
  }

  render () {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        //paddingTop: '5px',
        boxSizing: 'border-box'
      }}>

        <h2>Ամբիոնի բեռնվածք</h2>
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100',
            boxSizing: 'border-box',
            // height: "100%",
            // width: "100%",
            //paddingTop: '50px'
          }}
        >
          <h4>Ուսումնական պլան դասիչ
            <select name="selecting" id="selectID" onChange={this.handledSelectChange}>
              <option value={EMPTY}/>
              {this.state.classifiers.map(row => (<option value={row} key={row}>{row}</option>))}
            </select>
            <span> </span>
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

            suppressDragLeaveHidesColumns={true}
            suppressMakeColumnVisibleAfterUnGroup={true}
            rowGroupPanelShow={this.state.rowGroupPanelShow}
            localeText={this.state.localeText}

            gridOptions={this.state.topOptions}
          />
          <div style={{width: '100%', height: '40px'}} className="ag-theme-balham">

            <AgGridReact
              rowData={this.state.bottomData}
              gridOptions={this.state.bottomOptions}
              columnDefs={this.state.columnDefs}
              headerHeight="0"
              rowStyle={{fontWeight: 'bold'}}
              localeText={this.state.localeText}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default LoadChair
