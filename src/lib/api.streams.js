import { ENDPOINTS } from '../config'
import { jsonify } from '../util'

const options = {
  credentials: 'same-origin'
}

class StreamsFetcher {

  createStreamsRow = createStreamRow => {
    const  url = `${ENDPOINTS.CREATE_STREAMS_ROW}`
    const  body = JSON.stringify({
      ...createStreamRow
    })
    const headers = {'Content-Type': 'application/json'}
    const method = 'POST'

    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }

  getStreamsRows = classifier =>{
    const url = `${ENDPOINTS.GET_ALL_STREAMS}/${classifier}`
    return fetch(url)
  }

  removeStreamsRows = rowId => {
    const url = `${ENDPOINTS.REMOVE_STREAMS_ROW}/${rowId}`
    const headers = {'Content-Type': 'application/json'}
    const method = 'DELETE'
    const body = JSON.stringify({})

    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }
}

export default new StreamsFetcher()
