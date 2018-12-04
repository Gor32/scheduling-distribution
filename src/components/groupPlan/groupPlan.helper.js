import { COLUMN, columnDefs } from './groupPlan.constants'
import Fetcher from '../../lib/api'
import * as educationalPlanConstants from '../educationalPlan/educationalPlan.constants'

export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}

export function getEducationalPlan (classifier) {
  return Fetcher.educationalData.getEducationalRowsByClassifier(classifier)
    .then(res => res.json())
    .then(convertDataToGroupPlan)
}

function convertDataToGroupPlan (rows) {
  return rows.map(row => {
    let values = {}
    const val = calculateSemesters(row)
    values[COLUMN.LECTURE1] = val[COLUMN.LECTURE1]
    values[COLUMN.TESTING1] = val[COLUMN.TESTING1]
    values[COLUMN.PRACTICAL1] = val[COLUMN.PRACTICAL1]
    values[COLUMN.LAB1] = val[COLUMN.LAB1]
    values[COLUMN.EXAMINATION1] = val[COLUMN.EXAMINATION1]
    values[COLUMN.WEEKEND_TIME1] = val[COLUMN.WEEKEND_TIME1]

    values[COLUMN.LECTURE2] = val[COLUMN.LECTURE2]
    values[COLUMN.TESTING2] = val[COLUMN.TESTING2]
    values[COLUMN.PRACTICAL2] = val[COLUMN.PRACTICAL2]
    values[COLUMN.LAB2] = val[COLUMN.LAB2]
    values[COLUMN.EXAMINATION2] = val[COLUMN.EXAMINATION2]
    values[COLUMN.WEEKEND_TIME2] = val[COLUMN.WEEKEND_TIME2]

    values[COLUMN.SUBJECT] = row[educationalPlanConstants.COLUMN.COURSES]
    values[COLUMN.CHAIR] = row[educationalPlanConstants.COLUMN.DIGIT]

    return values
    //  console.log(row[educ.COLUMN.COURSES])
  })
}

function calculateSemesters (row) {

  let values = {}

  values[COLUMN.LECTURE1] = 0
  values[COLUMN.PRACTICAL1] = 0
  values[COLUMN.LAB1] = 0
  values[COLUMN.WEEKEND_TIME1] = 0

  values[COLUMN.LECTURE2] = 0
  values[COLUMN.PRACTICAL2] = 0
  values[COLUMN.LAB2] = 0
  values[COLUMN.WEEKEND_TIME2] = 0

  if (isValid(row[educationalPlanConstants.SEMESTERS.SEMESTER1])) {
    const splittingValues = row[educationalPlanConstants.SEMESTERS.SEMESTER1].split(':')
    values[COLUMN.LECTURE1] = Number(splittingValues[0])
    values[COLUMN.PRACTICAL1] = Number(splittingValues[1])
    values[COLUMN.LAB1] = Number(splittingValues[2])
    values[COLUMN.WEEKEND_TIME1] = Number(splittingValues.reduce(getSum))
  }

  if (isValid(row[educationalPlanConstants.SEMESTERS.SEMESTER2])) {
    const splittingValues = row[educationalPlanConstants.SEMESTERS.SEMESTER2].split(':')
    values[COLUMN.LECTURE2] = Number(splittingValues[0])
    values[COLUMN.PRACTICAL2] = Number(splittingValues[1])
    values[COLUMN.LAB2] = Number(splittingValues[2])
    values[COLUMN.WEEKEND_TIME2] = splittingValues.reduce(getSum)
  }

  return values
}

function getSum (total, num) {
  return Number(total) + Number(num)
}

function isValid (row) {
  if (row.length > 3) return true
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

