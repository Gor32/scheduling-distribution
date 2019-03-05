export const COLUMN_INPUT = {
  DIGIT: 'digit',
  SUBJECT: 'subject'
}

export const COLUMN = {
  CHAIR: 'chair',
  ...COLUMN_INPUT
}
export const COLUMN_PLACEHOLDER = {
  DIGIT: 'Թվանիշ',
  SUBJECT: 'Առարկա'
}
export const columnDefs = [
  {
    headerName: 'Ա. կոդ',
    width: 13,
    field: COLUMN.CHAIR
  },
  {
    headerName: 'Թվանիշ',
    width: 20,
    field: COLUMN.DIGIT
  },
  {
    headerName: 'Առարկա',
    field: COLUMN.SUBJECT
  }
]

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})

export const ENDING_CAPTIONS_INDEX = -1
export const OK = 1
