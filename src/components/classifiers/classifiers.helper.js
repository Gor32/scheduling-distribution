import { columnDefs } from './classifiers.constants'

export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}
