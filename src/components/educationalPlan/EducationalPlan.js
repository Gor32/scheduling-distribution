import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import './educationalPlan.style.css'

import 'ag-grid-enterprise'

import * as helper from './educationalPlan.helper'
import { gridLocaleText } from '../../util'

import {
  OK,
  EMPTY,
  COLUMN,
  VALUES,
  SEMESTERS,
  COLUMN_INPUT,
  COLUMN_PLACEHOLDER,
  ENDING_CAPTIONS_INDEX
} from './educationalPlan.constants'

import Fetcher from '../../lib/api'

class EducationalPlan extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columnDefs: helper.getColumnDefs(),
      rowData: helper.getRowData(),
      rowSelection: 'multiple',
      getRowHeight: helper.getRowHeight,
      values: {...VALUES},
      addedRow: [],
      removedRows: [],
      classifiers: [],
      selectedClassifier: EMPTY,
      courses: [],
      localeText: gridLocaleText,
      defaultColDef: {
        sortable: true,
        filter: true
      },
    }
  }

  onGridReady = params => {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
    this.getClassifiers()
    this.getCourses()
    //this.getEducationalRows()
  }

  getCourses = () => {
    Fetcher.subjects.getSubjectsRows()
      .then(res => res.json())
      .then(courses => this.setState({courses}))
      .then(() => {console.log(this.state.courses)})
  }

  getClassifiers = () => {
    Fetcher.classifiers.getDistinctClassifiersRows()
      .then(res => res.json())
      .then(classifiers => this.setState({classifiers}))
      .then(() => {console.log(this.state.classifiers)})
  }

  getEducationalRows = classifier => {
    Fetcher.educationalData.getEducationalRowsByClassifier(classifier)
      .then(res => res.json())
      .then(addedRow => this.setState({addedRow}))
      .then(() => {
        this.gridApi.updateRowData({add: [...this.state.addedRow]})
        this.state.addedRow.forEach(r => this.calculateSemestersNodeWithoutAdditionalData(r, true))
        this.gridApi.updateRowData({})
      })
  }

  handledTextChange = column => {
    return (e) => {
      const values = this.state.values
      if (column === COLUMN.COURSES) {
        this.textChangeCourses(e.target.value, values)
      }
      else {
        values[column] = e.target.value
      }

      this.setState({values})
      console.log(values)
    }
  }

  textChangeCourses = (value, values) => {
    if (value !== EMPTY) {
      const row = this.state.courses[value]
      values[COLUMN.COURSES] = row.subject
      values[COLUMN.DIGIT] = row.chair + '.' + row.digit
      values[COLUMN.COURSES_ID] = row._id
    }
    else {
      values[COLUMN.COURSES] = ''
      values[COLUMN.DIGIT] = ''
      values[COLUMN.COURSES_ID] = ''
    }
  }

  handledSelectChange = e => {
    this.setState({selectedClassifier: e.target.value})
    const selectedData = this.getAllRows()
    this.gridApi.updateRowData({remove: selectedData})
    this.selectedClassifierAddedDataToGrid(e.target.value)
  }

  selectedClassifierAddedDataToGrid = value => {
    if (value !== EMPTY) {
      const rowData = this.state.rowData.slice()
      Object.values(SEMESTERS)
        .forEach((semester) =>
          rowData[2][semester] = 0)
      this.getEducationalRows(value)
    }
  }

  getAllRows = () => {
    let rowData = []
    this.gridApi.forEachNode((node, index) => {
      if (index > ENDING_CAPTIONS_INDEX)
        rowData.push(node.data)
    })
    return rowData
  }

  createNewRowData = () => {
    return {
      row: {...this.state.values},
      exam: []
    }
  }

  onAddRow = () => {
    const newItem = this.createNewRowData()
    this.addRowInState(newItem.row)
    this.calculateSemestersNodeWithAdditionalData(newItem, true)
    this.gridApi.updateRowData({add: [newItem.row]})
  }

  calculateSemestersNodeWithAdditionalData = (item, isPlus) => {
    const rowData = this.state.rowData.slice()
    Object.values(SEMESTERS)
      .forEach((semester) =>
        rowData[2][semester] += helper.calculateSemestersWithAdditionalData(item.row[semester], item, semester, isPlus) || 0)
  }

  calculateSemestersNodeWithoutAdditionalData = (item, isPlus) => {
    const rowData = this.state.rowData.slice()
    Object.values(SEMESTERS)
      .forEach((semester) =>
        rowData[2][semester] += helper.calculateSemestersWithoutAdditionalData(item[semester], item, semester, isPlus) || 0)
  }

  addRowInState = row => {
    Fetcher.educationalData.createEducationalRow({...row, classifier: this.state.selectedClassifier})
      .then(r => {
        this.state.addedRow.push(r.createdRow)
        row._id = r.createdRow._id
      })
  }

  onRemoveSelected = () => {
    const selectedData = this.gridApi.getSelectedRows().filter(row => row.cantRemove !== true)
    const gridApiRows = this.gridApi.updateRowData({remove: selectedData})
    this.chooseData(gridApiRows.remove)
    this.removingData()
  }

  removingData = () => {
    const realRemoved = []
    this.state.removedRows
      .forEach(row =>
        Fetcher.educationalData.removeEducationalRow(row.data._id).then(r => {
          if (r.ok === OK) {
            realRemoved.push(row.data._id)
            this.calculateSemestersNodeWithoutAdditionalData(row.data, false)
          }
        }).then(() => {
          this.filterAddedAndRemovedState(realRemoved)
          this.gridApi.updateRowData({})
        }))
  }

  filterAddedAndRemovedState = row => {
    const addedRow = this.state.addedRow.filter(r => row.indexOf(r._id) === -1)
    const removedRows = this.state.removedRows.filter(r => row.indexOf(r.data._id) === -1)
    this.setState({addedRow, removedRows})
  }

  chooseData = removedRows => {
    removedRows.forEach(rowNode => {
      if (rowNode.rowIndex > ENDING_CAPTIONS_INDEX) {
        this.state.removedRows.push(rowNode)
      }
    })
  }

  render () {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        //paddingTop: '5px',
        boxSizing: 'border-box'
      }}
      >
        <h2>Ուսումնական պլան</h2>
        <div>
          <span>Ուսումնական պլան դասիչ </span>
          <select name="selecting" id="selectID" onChange={this.handledSelectChange}>
            <option value={EMPTY}/>
            {this.state.classifiers.map(row => (<option value={row} key={row}>{row}</option>))}
          </select>


          <select name="selectingCourses" id="selectCoursesID" onChange={this.handledTextChange(COLUMN.COURSES)}>
            <option value={EMPTY}>{'Առարկա, ամբիոնի կոդ'}</option>
            {this.state.courses.map((row, index) => (
              <option value={index} key={row.digit}>{' ' + row.subject + ', ' + row.chair}</option>))}
          </select>

          <div>
            <input type="text" placeholder={COLUMN_PLACEHOLDER.DIGIT} key={COLUMN_INPUT.DIGIT}
                   defaultValue={this.state.values[COLUMN_INPUT.DIGIT]}
                   onChange={this.handledTextChange(COLUMN_INPUT.DIGIT)} className="sem-input"/>
            <input type="text" placeholder={COLUMN_PLACEHOLDER.SEMESTER1} key={COLUMN_INPUT.SEMESTER1}
                   defaultValue={this.state.values[COLUMN_INPUT.SEMESTER1]}
                   onChange={this.handledTextChange(COLUMN_INPUT.SEMESTER1)} className="sem-input"/>
            <input type="text" placeholder={COLUMN_PLACEHOLDER.SEMESTER2} key={COLUMN_INPUT.SEMESTER2}
                   defaultValue={this.state.values[COLUMN_INPUT.SEMESTER2]}
                   onChange={this.handledTextChange(COLUMN_INPUT.SEMESTER2)} className="sem-input"/>
            <input type="text" placeholder={COLUMN_PLACEHOLDER.SEMESTER3} key={COLUMN_INPUT.SEMESTER3}
                   defaultValue={this.state.values[COLUMN_INPUT.SEMESTER3]}
                   onChange={this.handledTextChange(COLUMN_INPUT.SEMESTER3)} className="sem-input"/>
            <input type="text" placeholder={COLUMN_PLACEHOLDER.SEMESTER4} key={COLUMN_INPUT.SEMESTER4}
                   defaultValue={this.state.values[COLUMN_INPUT.SEMESTER4]}
                   onChange={this.handledTextChange(COLUMN_INPUT.SEMESTER4)} className="sem-input"/>
            <input type="text" placeholder={COLUMN_PLACEHOLDER.SEMESTER5} key={COLUMN_INPUT.SEMESTER5}
                   defaultValue={this.state.values[COLUMN_INPUT.SEMESTER5]}
                   onChange={this.handledTextChange(COLUMN_INPUT.SEMESTER5)} className="sem-input"/>
            <input type="text" placeholder={COLUMN_PLACEHOLDER.SEMESTER6} key={COLUMN_INPUT.SEMESTER6}
                   defaultValue={this.state.values[COLUMN_INPUT.SEMESTER6]}
                   onChange={this.handledTextChange(COLUMN_INPUT.SEMESTER6)} className="sem-input"/>
            <input type="text" placeholder={COLUMN_PLACEHOLDER.SEMESTER7} key={COLUMN_INPUT.SEMESTER7}
                   defaultValue={this.state.values[COLUMN_INPUT.SEMESTER7]}
                   onChange={this.handledTextChange(COLUMN_INPUT.SEMESTER7)} className="sem-input"/>
            <input type="text" placeholder={COLUMN_PLACEHOLDER.SEMESTER8} key={COLUMN_INPUT.SEMESTER8}
                   defaultValue={this.state.values[COLUMN_INPUT.SEMESTER8]}
                   onChange={this.handledTextChange(COLUMN_INPUT.SEMESTER8)} className="sem-input"/>
          </div>
          <button onClick={this.onRemoveSelected}>Հեռացնել նշվածները</button>
          &nbsp; &nbsp;
          <button onClick={this.onAddRow}>Ավելացնել տող</button>

        </div>
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '100',
            //paddingTop: '50px'
          }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            animateRows={true}
            enableColResize={true}
            rowData={this.state.rowData}
            enableGroupEdit={true}
            deltaRowDataMode={true}
            rowSelection={this.state.rowSelection}
            getRowHeight={this.state.getRowHeight}
            onGridReady={this.onGridReady}
            localeText={this.state.localeText}
          >
          </AgGridReact>
        </div>
      </div>
    )
  }
}

export default EducationalPlan
