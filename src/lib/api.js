import { jsonify } from '../util/index'
import { ENDPOINTS } from '../config'

const options = {
  credentials: 'include'
}

class Fetcher {
  createEducationalRow = landingPage => {
    const url = `${ENDPOINTS.CREATE_EDUCATIONAL_ROW}`
    const body = JSON.stringify({
      landingPage
    })
    const headers = {'Content-Type': 'application/json'}
    const method = 'POST'

    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }
}

export default new Fetcher()