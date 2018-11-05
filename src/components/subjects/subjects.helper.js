import { columnDefs } from './subjects.constants'

export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}
