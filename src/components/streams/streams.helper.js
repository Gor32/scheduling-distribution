import { columnDefs } from './streams.constants'
import Fetcher from '../../lib/api'

export function getCount (values) {
  return values.length
}

export function getColumnDefs () {
  return columnDefs.map(row => {return {...row}})
}

export function getStreams (classifier) {
  return Fetcher.streams.getStreamsRows(classifier)
    .then(res=>{
      //console.log('res', res); 
    return res;})
    .then(res => res.json())
    .then(res => {
      //console.log('res', res)
      if (res.error) {
        return Promise.reject()
      }
      return res
    })
}
