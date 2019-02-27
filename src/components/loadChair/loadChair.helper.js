import { columnDefs } from './loadChair.constants'
import { COLUMN } from './loadChair.constants'
import { COLUMN as groupPlanColumn } from '../groupPlan/groupPlan.constants'
import { COLUMN as classifierColumn } from '../classifiers/classifiers.constants'
import { getEducationalPlan } from '../groupPlan/groupPlan.helper'

import Fetcher from '../../lib/api'

export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}

export async function getLoadChair (classifier) {
  const educationalPlan = await getEducationalPlan(classifier, true)
  return convertToLoadChair(educationalPlan, classifier)
}

function convertToLoadChair (res, classifier) {
  let result = []
  let classifierGroup = []
  return Fetcher.classifiers.getClassifierGroups(classifier)
    .then(result => result.json())
    .then(r => {
      r.forEach(rr => classifierGroup.push(rr))
    })
    .then(() => {
      res.forEach(row => {
        const val = init()
        val[COLUMN.GROUP] = row['groupLoadChair']
        val[COLUMN.SUBJECT_ID] = row[groupPlanColumn.SUBJECT_ID]
        val[COLUMN.SUBJECT_NAME] = row[groupPlanColumn.SUBJECT]
        val[COLUMN.NUMBER_OF_STUDENTS] = classifierGroup.filter(r => {
          return r[classifierColumn.GROUP] === val[COLUMN.GROUP]
        })[0][classifierColumn.NUMBER_OF_STUDENTS]
        if (!val[COLUMN.NUMBER_OF_STUDENTS]) {val[COLUMN.NUMBER_OF_STUDENTS] = 0}
        result.push(val)
      })
      return result
    })
}

function init () {
  let values = {}
  values[COLUMN.SUBJECT_ID] = ''
  values[COLUMN.SUBJECT_NAME] = ''
  values[COLUMN.GROUP] = ''
  values[COLUMN.NUMBER_OF_STUDENTS] = 0
  values[COLUMN.LECTURE] = 0
  values[COLUMN.PRACTICAL] = 0
  values[COLUMN.LAB] = 0
  values[COLUMN.CONSULTATION] = 0
  values[COLUMN.TESTING] = 0
  values[COLUMN.EXAMINATION] = 0
  values[COLUMN.PRACTICE] = 0
  values[COLUMN.COURSE_WORK] = 0
  values[COLUMN.DIPLOMA] = 0
  values[COLUMN.TOTAL_SEMESTER] = 0
  values[COLUMN.TOTAL] = 0
  return values
}
