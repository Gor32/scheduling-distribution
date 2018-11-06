import { columnDefs } from './chairs.constants'

export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}
