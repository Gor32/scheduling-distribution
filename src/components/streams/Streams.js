import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import 'ag-grid-enterprise'

import * as helper from './streams.helper'
import GroupRowInnerRendererForStreams from '../groupRowInnerRendererForStreams/groupRowInnerRendererForStreams'
import { COLUMN, VALUES, ENDING_CAPTIONS_INDEX, OK } from './streams.constants'
import { getCount } from './streams.helper'
import { EMPTY } from '../educationalPlan/educationalPlan.constants'
import Fetcher from '../../lib/api'

class Streams extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columnDefs: helper.getColumnDefs(),
      rowData: [],
      classifiers: [],
      groups: [],
      subjects: [],
      selectedClassifier: '',
      selectedSubjectId: '',
      selectedGroup: '',
      frameworkComponents: {groupRowInnerRenderer: GroupRowInnerRendererForStreams},
      groupRowInnerRenderer: 'groupRowInnerRenderer',
      rowSelection: 'multiple',
      aggFuncs: {
        count: getCount
      },
      values: {...VALUES},
      addedRow: [],
      removedRows: [],
    }
  }

  createNewRowData = () => {
    console.log('sld', this.state.selectedSubjectId)
    return {
      ...this.state.values,
      'classifier': this.state.selectedClassifier,
      'semester': '1',
      'subjectId': this.state.selectedSubjectId
    }
  }

  getClassifiers = () => {
    Fetcher.classifiers.getDistinctClassifiersRows()
      .then(res => res.json())
      .then(classifiers => this.setState({classifiers}))
    //.then(() => {console.log(this.state.classifiers)})
  }
  getSubjects = () => {
    Fetcher.subjects.getSubjectsRows()
      .then(res => res.json())
      .then(subjects => this.setState({subjects}))
  }

  onGridReady = (params) => {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
    params.api.addAggFunc('getCount', getCount)
    this.getClassifiers()
    this.getSubjects()
  }

  onAddRow = () => {
    const newItem = this.createNewRowData()
    this.addRowInState(newItem)
    this.gridApi.updateRowData({add: [newItem]})
  }

  addRowInState = row => {
    console.log(row)
    Fetcher.streams.createStreamsRow(row)
      .then(r => {
        this.state.addedRow.push(r.createdRow)
        row._id = r.createdRow._id
        row.subject = this.state.subjects.find(subject => subject._id === r.createdRow.subjectId).subject
      })
  }

  onRemoveSelected = () => {
    const selectedData = this.gridApi.getSelectedRows()
    const gridApiRows = this.gridApi.updateRowData({remove: selectedData})
    this.chooseData(gridApiRows.remove)
    this.removingData()
  }

  chooseData = removedRows => {
    removedRows.forEach(rowNode => {
      if (rowNode.rowIndex > ENDING_CAPTIONS_INDEX) {
        this.state.removedRows.push(rowNode)
      }
    })
  }

  removingData = () => {
    const realRemoved = []
    this.state.removedRows
      .forEach(row =>
        Fetcher.streams.removeStreamsRows(row.data._id).then(r => {
          if (r.ok === OK) {
            realRemoved.push(row.data._id)
          }
        }).then(() => {
          this.filterAddedAndRemovedState(realRemoved)
        }))
  }

  filterAddedAndRemovedState = row => {
    const addedRow = this.state.addedRow.filter(r => row.indexOf(r._id) === -1)
    const removedRows = this.state.removedRows.filter(r => row.indexOf(r.data._id) === -1)
    this.setState({addedRow, removedRows})
  }

  handledTextChange = column => {
    return (e) => {
      const values = this.state.values
      if (column === COLUMN.NUMBER_OF_STUDENTS) {
        values[column] = Number(e.target.value)
      }
      else {
        values[column] = e.target.value
      }
      this.setState({values})
      console.log(values)
    }
  }

  handledSelectChange = e => {
    this.setState(
      {selectedClassifier: e.target.value},
      () =>
        Fetcher.classifiers.getClassifierGroups(this.state.selectedClassifier)
          .then(res => res.json())
          .then(res => res.map(r => r.group))
          .then(groups => this.setState({groups}))
    )

    const selectedData = this.getAllRows()
    this.gridApi.updateRowData({remove: selectedData})

    helper.getStreams(e.target.value)
      .then(rowData => rowData.map(r => {
        return {
          ...r,
          'subject': this.state.subjects.find(subject => subject._id === r.subjectId).subject
        }
      }))
      .then(rowData => this.gridApi.updateRowData({add: [...rowData]}))
  }

  handledGroupSelectChange = e => {
    this.setState({selectedGroup: e.target.value})
    const values = this.state.values
    values[COLUMN.GROUP] = e.target.value
    this.setState({values})
  }

  handledSubjectSelectChange = e => {
    this.setState({selectedSubjectId: e.target.value})
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
          <h4>Ուսումնական Պլան դասիչ
            <select name="selecting" id="selectID" onChange={this.handledSelectChange}>
              <option value={EMPTY}/>
              {this.state.classifiers.map(row => (<option value={row} key={row}>{row}</option>))}
            </select>
          </h4>

          <h4>
            <select name="groupSelecting" id="groupSelectId" onChange={this.handledGroupSelectChange}>
              <option value={EMPTY}/>
              {this.state.groups.map(row => (<option value={row} key={row + this.state.classifiers}>{row}</option>))}
            </select>
          </h4>
          <h4>
            <select name="subjectSelecting" id="subjectSelectId" onChange={this.handledSubjectSelectChange}>
              <option value={EMPTY}/>
              {this.state.subjects.map(row => (<option value={row._id} key={row._id}>{row.subject}</option>))}
            </select>
          </h4>

          <h2>Հոսքեր</h2>
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

            aggFuncs={this.state.aggFuncs}
            enableGroupEdit={true}>
          </AgGridReact>
        </div>
      </div>
    )
  }
}

export default Streams
