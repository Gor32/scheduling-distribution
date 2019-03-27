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

  initParamsRow = () => {
    const url = `${ENDPOINTS.INIT_ALL_PARAMS}`
    return fetch(url)
  }
}

export default new ParamsFetcher()
