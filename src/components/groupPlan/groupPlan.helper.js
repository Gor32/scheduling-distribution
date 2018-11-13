import { columnDefs } from './groupPlan.constants'

export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}
