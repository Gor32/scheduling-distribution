import { getCount } from './streams.helper'

export const COLUMN = {
  STREAM: 'stream',
  GROUP: 'group',
  NUMBER_OF_STUDENTS: 'numberOfStudents',
  SUBJECT: 'subject'
}

export const columnDefs = [
  {
    headerName: 'Stream',
    field: COLUMN.STREAM,
    rowGroup: true,
  },
  {
    headerName: 'Group',
    field: COLUMN.GROUP,
    aggFunc: getCount,
    enableValue: true
  },
  {
    headerName: 'Number of students',
    field: COLUMN.NUMBER_OF_STUDENTS,
    aggFunc: 'sum',
    enableValue: true
  },
  {
    headerName: 'Subject',
    field: 'subject'
  }
]

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})

export const ENDING_CAPTIONS_INDEX = -1
export const OK = 1




