import { ENDPOINTS } from '../config'
import { jsonify } from '../util'

const options = {
  credentials: 'same-origin'
}

class ChairsFetcher {

  createChairsRow = chairsRow =>{
    const url = `${ENDPOINTS.CREATE_CHAIRS_ROW}`
    const body = JSON.stringify({
      ...chairsRow
    })
    const headers = {'Content-Type': 'application/json'}
    const method = 'POST'

    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }

  getChairsRows = () => {
    const url = `${ENDPOINTS.GET_ALL_CHAIRS}`
    return fetch(url)
  }

  removeChairsRow = rowId => {
    const url = `${ENDPOINTS.REMOVE_CHAIRS_ROW}/${rowId}`
    const headers = {'Content-Type': 'application/json'}
    const method = 'DELETE'
    const body = JSON.stringify({})
    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }
}

export default new ChairsFetcher()
