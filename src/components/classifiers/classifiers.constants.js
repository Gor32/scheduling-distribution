export const COLUMN = {
  CLASSIFIER: 'classifier',
  GROUP: 'group'
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
  }
]

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})
