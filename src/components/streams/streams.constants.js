import { getCount } from './streams.helper'

export const COLUMN = {
  STREAM: 'stream',
  GROUP: 'group',
  NUMBER_OF_STUDENTS: 'numberOfStudents',
  SUBJECT: 'subject'
}

export const columnDefs = [
  {
    headerName: 'Հոսք',
    field: COLUMN.STREAM,
    rowGroup: true,
  },
  {
    headerName: 'Խումբ',
    field: COLUMN.GROUP,
    aggFunc: getCount,
    enableValue: true
  },
  {
    headerName: 'Ուսանողների քանակ',
    field: COLUMN.NUMBER_OF_STUDENTS,
    aggFunc: 'sum',
    enableValue: true
  },
  {
    headerName: 'Առարկա',
    field: 'subject'
  }
]

export const COLUMN_PLACEHOLDER = {
  STREAM: 'Հոսք',
  GROUP: 'Խումբ',
  NUMBER_OF_STUDENTS: 'Ուսանողների քանակ',
  SUBJECT: 'Առարկա',
}

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})

export const ENDING_CAPTIONS_INDEX = -1
export const OK = 1




