import { columnDefs } from './streams.constants'

export function getCount (values) {
  return values.length
}


export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}
