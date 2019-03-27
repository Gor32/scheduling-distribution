import { ENDPOINTS } from '../config'
import { jsonify } from '../util'

const options = {
  credentials: 'same-origin'
}

class ParamsFetcher {
  getParamsRow = () => {
    const url = `${ENDPOINTS.GET_ALL_PARAMS}`
    return fetch(url)
  }

  setParamsRow = params => {
    const url = `${ENDPOINTS.SET_ALL_PARAMS}`
    const body = JSON.stringify({
      ...params
    })
    const headers = {'Content-Type': 'application/json'}
    const method = 'POST'

    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }

  initParamsRow = () => {
    const url = `${ENDPOINTS.INIT_ALL_PARAMS}`
    return fetch(url)
  }
}

export default new ParamsFetcher()
