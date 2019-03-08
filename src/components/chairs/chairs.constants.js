export const COLUMN = {
  CODE: 'code',
  CHAIR: 'chair'
}

export const COLUMN_PLACEHOLDER = {
  CODE: 'Ամբիոնի կոդ',
  CHAIR: 'Ամբիոն'
}

export const columnDefs = [
  {
    headerName: 'Ամբիոնի կոդ',
    width: 300,
    field: COLUMN.CODE
  },
  {
    headerName: 'Ամբիոն',
    width: 700,
    field: COLUMN.CHAIR
  }
]

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})

export const ENDING_CAPTIONS_INDEX = -1
export const OK = 1
