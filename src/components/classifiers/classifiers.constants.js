export const COLUMN = {
  CLASSIFIER: 'classifier',
  GROUP: 'group',
  NUMBER_OF_STUDENTS: 'numberOfStudents',
}

export const columnDefs = [
  {
    headerName: 'Classifier',
    field: COLUMN.CLASSIFIER,
    rowGroup: true,
  },
  {
    headerName: 'Group',
    field: COLUMN.GROUP,
    enableValue: true
  },
  {
    headerName: 'Number of students',
    field: COLUMN.NUMBER_OF_STUDENTS,
    aggFunc: 'sum',
    enableValue: true
  },
]

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})

export const ENDING_CAPTIONS_INDEX = -1
export const OK = 1
