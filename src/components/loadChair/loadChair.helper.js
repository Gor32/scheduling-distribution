import { columnDefs } from './loadChair.constants'
import { COLUMN, WEEK_OF_EDUCATIONAL, WEEK_MANUFACTURER } from './loadChair.constants'
import { COLUMN as groupPlanColumn } from '../groupPlan/groupPlan.constants'
import { COLUMN as classifierColumn } from '../classifiers/classifiers.constants'
import { getEducationalPlan } from '../groupPlan/groupPlan.helper'
import { getStreams } from '../streams/streams.helper'

import Fetcher from '../../lib/api'
import { PARAMS } from '../norms/norms.constants'

const VALUE_MANUFACTURER = WEEK_MANUFACTURER * WEEK_OF_EDUCATIONAL

export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}

export async function getLoadChair (classifier) {
  const educationalPlan = await getEducationalPlan(classifier, true, true)
  const params = await Fetcher.params.getParamsRow().then(res => res.json())
  const examValues = await getExamValues2(classifier)
  return convertToLoadChair(educationalPlan, classifier, params, examValues)
}

function convertToLoadChair (res, classifier, parameters, examValues) {
  let result = []
  let classifierGroup = []
  const params = {}
  parameters.forEach(r => {
    params[r.code] = r
  })
  //console.log(params)

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

        val[COLUMN.PRACTICAL] = (row[groupPlanColumn.PRACTICAL1] + row[groupPlanColumn.PRACTICAL2]) * VALUE_MANUFACTURER *
          Math.ceil(val[COLUMN.NUMBER_OF_STUDENTS] / params[PARAMS.PRACTICAL].value)

        val[COLUMN.LAB] = (row[groupPlanColumn.LAB1] + row[groupPlanColumn.LAB2]) * VALUE_MANUFACTURER *
          Math.ceil(val[COLUMN.NUMBER_OF_STUDENTS] / params[PARAMS.LAB].value)

        val[COLUMN.TESTING] = (row[groupPlanColumn.TESTING1] === 'Ս' ? 1 : 0) *
          Math.ceil(val[COLUMN.NUMBER_OF_STUDENTS] * params[PARAMS.TESTING].value)
        val[COLUMN.TESTING] += (row[groupPlanColumn.TESTING2] === 'Ս' ? 1 : 0) *
          Math.ceil(val[COLUMN.NUMBER_OF_STUDENTS] * params[PARAMS.TESTING].value)

        val[COLUMN.EXAMINATION] = (row[groupPlanColumn.EXAMINATION1] === 'Ք' ? 1 : 0) *
          Math.ceil(val[COLUMN.NUMBER_OF_STUDENTS] * params[PARAMS.EXAMINATION].value)
        val[COLUMN.EXAMINATION] += (row[groupPlanColumn.EXAMINATION2] === 'Ք' ? 1 : 0) *
          Math.ceil(val[COLUMN.NUMBER_OF_STUDENTS] * params[PARAMS.EXAMINATION].value)

        val[COLUMN.COURSE_WORK] = (row[groupPlanColumn.COURSE1] === 'ԿԱ' ? 1 : 0) *
          val[COLUMN.NUMBER_OF_STUDENTS] * params[PARAMS.COURSE_WORK].value
        val[COLUMN.COURSE_WORK] += (row[groupPlanColumn.COURSE2] === 'ԿԱ' ? 1 : 0) *
          val[COLUMN.NUMBER_OF_STUDENTS] * params[PARAMS.COURSE_WORK].value
        val[COLUMN.COURSE_WORK] = (row[groupPlanColumn.COURSE1] === 'ԿՆ' ? 1 : 0) *
          val[COLUMN.NUMBER_OF_STUDENTS] * params[PARAMS.COURSE_PROJECT].value
        val[COLUMN.COURSE_WORK] += (row[groupPlanColumn.COURSE2] === 'ԿՆ' ? 1 : 0) *
          val[COLUMN.NUMBER_OF_STUDENTS] * params[PARAMS.COURSE_PROJECT].value

        val[COLUMN.CONSULTATION] = (row[groupPlanColumn.EXAMINATION1] === 'Ք' ? 1 : 0) *
          params[PARAMS.CONSULTATION_EXAMINATION].value
        val[COLUMN.CONSULTATION] += (row[groupPlanColumn.EXAMINATION2] === 'Ք' ? 1 : 0) *
          params[PARAMS.CONSULTATION_EXAMINATION].value
        val[COLUMN.CONSULTATION] += (row[groupPlanColumn.TESTING1] === 'Ս' ? 1 : 0) *
          params[PARAMS.CONSULTATION_TESTING].value
        val[COLUMN.CONSULTATION] += (row[groupPlanColumn.TESTING2] === 'Ս' ? 1 : 0) *
          params[PARAMS.CONSULTATION_TESTING].value

        val[COLUMN.DIPLOMA] = (row[groupPlanColumn.DIPLOMA1] === 'Դ' ? 1 : 0) *
          Math.ceil(val[COLUMN.NUMBER_OF_STUDENTS] * params[PARAMS.DIPLOMA].value)
        val[COLUMN.DIPLOMA] += (row[groupPlanColumn.DIPLOMA2] === 'Դ' ? 1 : 0) *
          Math.ceil(val[COLUMN.NUMBER_OF_STUDENTS] * params[PARAMS.DIPLOMA].value)

        val[COLUMN.PRACTICE] = (row[groupPlanColumn.PRACTICE1][0] === 'Պ' ? 1 : 0) *
          Math.ceil(Number(row[groupPlanColumn.PRACTICE1].substring(1)) * params[PARAMS.PRACTICE].value)
        val[COLUMN.PRACTICE] += (row[groupPlanColumn.PRACTICE2][0] === 'Պ' ? 1 : 0) *
          Math.ceil(Number(row[groupPlanColumn.PRACTICE2].substring(1)) * params[PARAMS.PRACTICE].value)

        val[COLUMN.LECTURE] = 0
        val[COLUMN.TOTAL] = 0
        val[COLUMN.TOTAL] += val[COLUMN.PRACTICAL]
        val[COLUMN.TOTAL] += val[COLUMN.LAB]
        val[COLUMN.TOTAL] += val[COLUMN.TESTING]
        val[COLUMN.TOTAL] += val[COLUMN.EXAMINATION]
        val[COLUMN.TOTAL] += val[COLUMN.COURSE_WORK]
        val[COLUMN.TOTAL] += val[COLUMN.CONSULTATION]
        val[COLUMN.TOTAL] += val[COLUMN.DIPLOMA]
        val[COLUMN.TOTAL] += val[COLUMN.PRACTICE]

        const res = getExamValues(val[COLUMN.GROUP], val[COLUMN.SUBJECT_ID], examValues)

        if (res !== null && row[groupPlanColumn.LECTURE1] !== 0 && row[groupPlanColumn.LECTURE2] !== 0) {
          // val[COLUMN.LECTURE] = res.length
          val[COLUMN.LECTURE] = ((row[groupPlanColumn.LECTURE1] + row[groupPlanColumn.LECTURE2]) *
            VALUE_MANUFACTURER).toString() + '/' + res.length.toString()
          val[COLUMN.TOTAL] += ' + '+val[COLUMN.LECTURE]
          // val[COLUMN.TOTAL] += (row[groupPlanColumn.LECTURE1] + row[groupPlanColumn.LECTURE2]) * VALUE_MANUFACTURER / res.length
          // console.log(val[COLUMN.TOTAL], ' ', val[COLUMN.LECTURE])
        }

        // if(res !== null) {
        //   val[COLUMN.TOTAL] = (Math.round(val[COLUMN.TOTAL]*res.length)).toString() + '/'+ res.length.toString()
        // }
        result.push(val)
      })
      return result
    })
}

function getExamValues (group, subjectId, value) {
  const values = value[subjectId]
  let usingGroup = false
  let usingStream = ''
  if (values) {
    values.forEach(r => {
      if (r.group === group) {
        usingStream = r.stream
        usingGroup = true
      }
    })
    if (usingGroup) {
      const values2 = groupBy('stream')(values)
      // console.log(values2)
      // console.log(usingStream)
      // console.log(values2[usingStream].length)
      return values2[usingStream]
    }
  }
  return null
}

function getExamValues2 (classifier) {
  return getStreams(classifier).then(rowData => {
    return groupBy('subjectId')(rowData)
  })
}

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

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

export function changeRowAfterSelectZero (row, changeFrom, changeTo) {
  if (row[COLUMN.NUMBER_OF_STUDENTS] === changeFrom) {
    row[COLUMN.NUMBER_OF_STUDENTS] = changeTo
  }

  if (row[COLUMN.LECTURE] === changeFrom) {
    row[COLUMN.LECTURE] = changeTo
  }

  if (row[COLUMN.PRACTICAL] === changeFrom) {
    row[COLUMN.PRACTICAL] = changeTo
  }

  if (row[COLUMN.LAB] === changeFrom) {
    row[COLUMN.LAB] = changeTo
  }

  if (row[COLUMN.CONSULTATION] === changeFrom) {
    row[COLUMN.CONSULTATION] = changeTo
  }

  if (row[COLUMN.TESTING] === changeFrom) {
    row[COLUMN.TESTING] = changeTo
  }

  if (row[COLUMN.EXAMINATION] === changeFrom) {
    row[COLUMN.EXAMINATION] = changeTo
  }

  if (row[COLUMN.PRACTICE] === changeFrom) {
    row[COLUMN.PRACTICE] = changeTo
  }

  if (row[COLUMN.COURSE_WORK] === changeFrom) {
    row[COLUMN.COURSE_WORK] = changeTo
  }

  if (row[COLUMN.DIPLOMA] === changeFrom) {
    row[COLUMN.DIPLOMA] = changeTo
  }
}

