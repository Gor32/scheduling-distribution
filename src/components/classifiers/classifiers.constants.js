export const COLUMN = {
  CLASSIFIER: 'classifier',
  GROUP: 'group',
  NUMBER_OF_STUDENTS: 'numberOfStudents',
}

export const COLUMN_PLACEHOLDER = {
  CLASSIFIER: 'Դասիչ',
  GROUP: 'Խումբ',
  NUMBER_OF_STUDENTS: 'Ուսանողների քանակ',
}

export const columnDefs = [
  {
    headerName: 'Դասիչ',
    field: COLUMN.CLASSIFIER,
    rowGroup: true,
  },
  {
    headerName: 'Խումբ',
    field: COLUMN.GROUP,
    enableValue: true
  },
  {
    headerName: 'Ուսանողների քանակ',
    field: COLUMN.NUMBER_OF_STUDENTS,
    aggFunc: 'sum',
    enableValue: true
  },
]

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})

export const ENDING_CAPTIONS_INDEX = -1
export const OK = 1
