import { COLUMN, columnDefs } from './groupPlan.constants'
import Fetcher from '../../lib/api'
import * as educationalPlanConstants from '../educationalPlan/educationalPlan.constants'

export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}

export function getEducationalPlan (classifier) {
  return getGroupByClassifier(classifier)
    .then(groups => {
      return Fetcher.educationalData.getEducationalRowsByClassifier(classifier)
        .then(res => res.json())
        .then(res => convertDataToGroupPlan(res, groups))
    })
}

function getGroupByClassifier (classifier) {
  return Fetcher.classifiers.getClassifiersRows()
    .then(res => res.json())
    .then(r => r.filter(l => l['classifier'] === classifier))
    .then(r => r.map(row => row['group']))
}

function convertDataToGroupPlan (rows, groups) {
  let results = []
  groups.forEach(group => {
    const course = Math.abs(Number(group[0]) - 9)
    results.push({section: 'group', subject: group + ' կուրս ' + course})
    results = results.concat(rows.map(row => {
      let values = {}
      const val = calculateSemesters(row, course)

      values[COLUMN.LECTURE1] = val[COLUMN.LECTURE1]
      values[COLUMN.TESTING1] = val[COLUMN.TESTING1]
      values[COLUMN.PRACTICAL1] = val[COLUMN.PRACTICAL1]
      values[COLUMN.LAB1] = val[COLUMN.LAB1]
      values[COLUMN.EXAMINATION1] = val[COLUMN.EXAMINATION1]
      values[COLUMN.WEEKEND_TIME1] = val[COLUMN.WEEKEND_TIME1]
      values[COLUMN.COURSE1] = val[COLUMN.COURSE1]

      values[COLUMN.LECTURE2] = val[COLUMN.LECTURE2]
      values[COLUMN.TESTING2] = val[COLUMN.TESTING2]
      values[COLUMN.PRACTICAL2] = val[COLUMN.PRACTICAL2]
      values[COLUMN.LAB2] = val[COLUMN.LAB2]
      values[COLUMN.EXAMINATION2] = val[COLUMN.EXAMINATION2]
      values[COLUMN.WEEKEND_TIME2] = val[COLUMN.WEEKEND_TIME2]
      values[COLUMN.COURSE2] = val[COLUMN.COURSE2]

      values[COLUMN.SUBJECT] = row[educationalPlanConstants.COLUMN.COURSES]
      values[COLUMN.CHAIR] = row[educationalPlanConstants.COLUMN.DIGIT]

      return values
    }).filter(validation))
  })
  return results
}

function validation (row) {
  if (!(row[COLUMN.LECTURE1] === '' || row[COLUMN.LECTURE1] === 0)) {
    return true
  }
  if (!(row[COLUMN.PRACTICAL1] === '' || row[COLUMN.PRACTICAL1] === 0)) {
    return true
  }
  if (!(row[COLUMN.LAB1] === '' || row[COLUMN.LAB1] === 0)) {
    return true
  }
  if (!(row[COLUMN.COURSE1] === '')) {
    return true
  }

  if (!(row[COLUMN.LECTURE2] === '' || row[COLUMN.LECTURE2] === 0)) {
    return true
  }
  if (!(row[COLUMN.PRACTICAL2] === '' || row[COLUMN.PRACTICAL2] === 0)) {
    return true
  }
  if (!(row[COLUMN.LAB2] === '' || row[COLUMN.LAB2] === 0)) {
    return true
  }
  if (row[COLUMN.COURSE2] !== '') {
    return true
  }

  return false
}

function calculateSemesters (row, course) {

  let values = {}

  values[COLUMN.LECTURE1] = 0
  values[COLUMN.PRACTICAL1] = 0
  values[COLUMN.LAB1] = 0
  values[COLUMN.WEEKEND_TIME1] = 0

  values[COLUMN.LECTURE2] = 0
  values[COLUMN.PRACTICAL2] = 0
  values[COLUMN.LAB2] = 0
  values[COLUMN.WEEKEND_TIME2] = 0

  values[COLUMN.COURSE2] = ''
  values[COLUMN.COURSE1] = ''

  let splittingValues1 = row[educationalPlanConstants.SEMESTERS.SEMESTER1].split(':')
  let splittingValues2 = row[educationalPlanConstants.SEMESTERS.SEMESTER2].split(':')
  switch (course) {
    case 2:
      splittingValues1 = row[educationalPlanConstants.SEMESTERS.SEMESTER3].split(':')
      splittingValues2 = row[educationalPlanConstants.SEMESTERS.SEMESTER4].split(':')
      break
    case 3:
      splittingValues1 = row[educationalPlanConstants.SEMESTERS.SEMESTER5].split(':')
      splittingValues2 = row[educationalPlanConstants.SEMESTERS.SEMESTER6].split(':')
      break
    case 4:
      splittingValues1 = row[educationalPlanConstants.SEMESTERS.SEMESTER7].split(':')
      splittingValues2 = row[educationalPlanConstants.SEMESTERS.SEMESTER8].split(':')
      break
    default:
  }

  if (splittingValues1.length > 2) {
    values[COLUMN.LECTURE1] = Number(splittingValues1[0])
    values[COLUMN.PRACTICAL1] = Number(splittingValues1[1])
    values[COLUMN.LAB1] = Number(splittingValues1[2])
    values[COLUMN.WEEKEND_TIME1] = Number(splittingValues1.reduce(getSum))
    if (splittingValues1.length > 3) {
      values[COLUMN.EXAMINATION1] = 'Ք'
    } else {
      values[COLUMN.TESTING1] = 'Ս'
    }
  } else {
    if (splittingValues1.length > 0 && splittingValues1[0] !== '')
      values[COLUMN.COURSE1] = 'Կ'
  }

  if (splittingValues2.length > 2) {
    values[COLUMN.LECTURE2] = Number(splittingValues2[0])
    values[COLUMN.PRACTICAL2] = Number(splittingValues2[1])
    values[COLUMN.LAB2] = Number(splittingValues2[2])
    values[COLUMN.WEEKEND_TIME2] = splittingValues2.reduce(getSum)
    if (splittingValues2.length > 3) {
      values[COLUMN.EXAMINATION2] = 'Ք'
    }
    else {
      values[COLUMN.TESTING2] = 'Ս'
    }
  }
  else {
    if (splittingValues2.length > 0 && splittingValues2[0] !== '')
      values[COLUMN.COURSE2] = 'Կ'
  }

  return values
}

function getSum (total, num) {
  if (num !== 'Ք' && num !== 'Ս' && num !== 'Կ') {
    return Number(total) + Number(num)
  }
  return Number(total)
}

export function changeRowAfterSelectZero (row, changeFrom, changeTo) {

  if (row[COLUMN.LECTURE1] === changeFrom) {
    row[COLUMN.LECTURE1] = changeTo
  }
  if (row[COLUMN.LECTURE2] === changeFrom) {
    row[COLUMN.LECTURE2] = changeTo
  }

  if (row[COLUMN.PRACTICAL1] === changeFrom) {
    row[COLUMN.PRACTICAL1] = changeTo
  }
  if (row[COLUMN.PRACTICAL2] === changeFrom) {
    row[COLUMN.PRACTICAL2] = changeTo
  }

  if (row[COLUMN.LAB1] === changeFrom) {
    row[COLUMN.LAB1] = changeTo
  }
  if (row[COLUMN.LAB2] === changeFrom) {
    row[COLUMN.LAB2] = changeTo
  }

  if (row[COLUMN.WEEKEND_TIME1] === changeFrom) {
    row[COLUMN.WEEKEND_TIME1] = changeTo
  }
  if (row[COLUMN.WEEKEND_TIME2] === changeFrom) {
    row[COLUMN.WEEKEND_TIME2] = changeTo
  }

}

export function groupInfo (params) {
  if (params.data.section === 'group') {
    return 16
  }
  return 1
}
