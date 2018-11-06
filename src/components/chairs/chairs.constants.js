export const COLUMN = {
  CODE: 'code',
  CHAIR: 'chair'
}

export const columnDefs = [
  {
    headerName: 'Ամբիոնի կոդ',
    width: 20,
    field: COLUMN.CODE
  },
  {
    headerName: 'Ամբիոն',
    field: COLUMN.CHAIR
  }
]

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})

export const ENDING_CAPTIONS_INDEX = -1
export const OK = 1
