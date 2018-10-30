import { jsonify } from '../util/index'
import { ENDPOINTS } from '../config'

const options = {
  credentials: 'same-origin'
}

class Fetcher {
  createEducationalRow = landingPage => {
    const url = `${ENDPOINTS.CREATE_EDUCATIONAL_ROW}`
    const body = JSON.stringify({
      ...landingPage
    })
    const headers = {'Content-Type': 'application/json'}
    const method = 'POST'

    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }

  getEducationalRows = () => {
    const url = `${ENDPOINTS.GET_ALL_EDUCATIONAL_PLAN}`
    return fetch(url)
  }
}

export default new Fetcher()
