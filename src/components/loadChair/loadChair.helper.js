import { columnDefs } from './loadChair.constants'

export function getColumnDefs () {
  return columnDefs.map(row=>{return {...row}});
}
