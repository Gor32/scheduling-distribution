import { ENDPOINTS } from '../config'
import { jsonify } from '../util'

const options = {
  credentials: 'same-origin'
}

class EducationalDataFetcher {

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

  getEducationalRowsByClassifier = classifier => {
    const url = `${ENDPOINTS.GET_EDUCATIONAL_PLAN_BY_CLASSIFIER}/${classifier}`
    return fetch(url)
  }
  removeEducationalRow = rowId => {
    const url = `${ENDPOINTS.REMOVE_EDUCATIONAL_ROW}/${rowId}`
    const headers = {'Content-Type': 'application/json'}
    const method = 'DELETE'
    const body = JSON.stringify({})
    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }
}

export default new EducationalDataFetcher()
