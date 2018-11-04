export const COLUMN = {
  DIGIT: 'digit',
  SUBJECT: 'subject'
}

export const columnDefs = [
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
