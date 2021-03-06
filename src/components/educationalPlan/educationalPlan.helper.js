import { columnDefs, rowData } from './educationalPlan.constants'

function isFirstRow (params) {
  return params.data.section === 'semesters'
}

function isSecondRow (params) {
  return params.data.section === 'modules'
}

function isLectureInfoRow (params) {
  return params.data.section === 'lecturesTime'
}

export function printResult (res) {
  console.log('---------------------------------------')
  if (res.add) {
    res.add.forEach((rowNode) => {
      console.log('Added Row Node', rowNode)
    })
  }
  if (res.remove) {
    res.remove.forEach((rowNode) => {
      console.log('Removed Row Node', rowNode)
    })
  }
  if (res.update) {
    res.update.forEach((rowNode) => {
      console.log('Updated Row Node', rowNode)
    })
  }

}

export function digitColSpan (params) {
  if (isFirstRow(params)) {
    return 2
  }
  else if (isSecondRow(params)) {
    return 10
  }
  else if (isLectureInfoRow(params)) {
    return 2
  }
  return 1
}

export function semester1ColSpan (params) {
  if (isFirstRow(params)) {
    return 8
  }
  return 1
}

export function getRowHeight (params) {
  return isFirstRow(params) ? 40 : 25
}

export function calculateSemestersWithAdditionalData (semester, newItem, column, isPlus) {
  return calculateSemesters(semester, newItem, column, isPlus, true)
}

function calculateSemesters (semester, newItem, column, isPlus, isAdditionalData) {
  if (semester == null) return 0
  const lecValues = semester.slice()
  let resSem = 0
  for (let i of lecValues.split('։')) {
    if (i === 'Q') {
      if (isAdditionalData && isPlus) {
        newItem.exam.push(column)
      }
      continue
    }
    if (isPlus) {
      resSem += Number(i) || 0
    }
    else {
      resSem -= Number(i) || 0
    }
  }
  return resSem
}

export function calculateSemestersWithoutAdditionalData (semester, newItem, column, isPlus) {
  return calculateSemesters(semester, newItem, column, isPlus, false)
}

export function getRowData () {
  return rowData.map(row => {return {...row}})
}

export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}
