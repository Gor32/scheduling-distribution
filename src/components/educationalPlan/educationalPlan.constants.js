import * as helper from './educationalPlan.helper'

const cellSemester1ClassRules = {
  'semesters-cell': 'data.section === "semesters"',
  'modules-cell': 'data.section === "modules"'
}

const cellDigitClassRules = {
  'semesters-cell': 'data.section === "semesters"',
  'modules-cell': 'data.section === "modules"',
  'lecturesTime-cell': 'data.section === "lecturesTime" '
}

export const SEMESTERS = {
  SEMESTER1: 'semester1',
  SEMESTER2: 'semester2',
  SEMESTER3: 'semester3',
  SEMESTER4: 'semester4',
  SEMESTER5: 'semester5',
  SEMESTER6: 'semester6',
  SEMESTER7: 'semester7',
  SEMESTER8: 'semester8'
}

export const COLUMN_INPUT = {
  DIGIT: 'digit',
  ...SEMESTERS
}

export const COLUMN = {
  COURSES: 'courses',
  COURSES_ID: 'coursesId',
  ...COLUMN_INPUT
}

export const COLUMN_PLACEHOLDER = {
  DIGIT: 'թվանիշ',
  SEMESTER1: 'կիսամյակ 1',
  SEMESTER2: 'կիսամյակ 2',
  SEMESTER3: 'կիսամյակ 3',
  SEMESTER4: 'կիսամյակ 4',
  SEMESTER5: 'կիսամյակ 5',
  SEMESTER6: 'կիսամյակ 6',
  SEMESTER7: 'կիսամյակ 7',
  SEMESTER8: 'կիսամյակ 8'
}

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})

export const columnDefs = [
  {
    headerName: 'Թվանիշ',
    field: COLUMN.DIGIT,
    colSpan: helper.digitColSpan,
    cellClassRules: cellDigitClassRules
  },
  {
    headerName: 'Դասընթացներ',
    field: COLUMN.COURSES
  },
  {
    headerName: '1',
    field: COLUMN.SEMESTER1,
    colSpan: helper.semester1ColSpan,
    cellClassRules: cellSemester1ClassRules
  },
  {
    headerName: '2',
    field: COLUMN.SEMESTER2
  },
  {
    headerName: '3',
    field: COLUMN.SEMESTER3
  },
  {
    headerName: '4',
    field: COLUMN.SEMESTER4
  },
  {
    headerName: '5',
    field: COLUMN.SEMESTER5
  },
  {
    headerName: '6',
    field: COLUMN.SEMESTER6
  },
  {
    headerName: '7',
    field: COLUMN.SEMESTER7
  },
  {
    headerName: '8',
    field: COLUMN.SEMESTER8
  }
]

export const rowData = [
  {
    section: 'semesters',
    semester1: 'Կիսամյակներ',
    digit: 'Մոդուլներ / դասընթացներ',
    cantRemove: true
  },
  {
    section: 'modules',
    digit: 'Ընդհանուր կրթության կառուցամաս',
    cantRemove: true
  },
  {
    section: 'lecturesTime',
    digit: 'Լսարանային ժամերը',
    semester1: 0,
    semester2: 0,
    semester3: 0,
    semester4: 0,
    semester5: 0,
    semester6: 0,
    semester7: 0,
    semester8: 0,
    cantRemove: true
  }
]

export const ENDING_CAPTIONS_INDEX = 2
export const OK = 1

export const EMPTY = 'empty'
