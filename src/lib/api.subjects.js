import { ENDPOINTS } from '../config'
import { jsonify } from '../util'

const options = {
  credentials: 'same-origin'
}

class SubjectsFetcher {

  createSubjectsRow = subjectsRow =>{
    const url = `${ENDPOINTS.CREATE_SUBJECTS_ROW}`
    const body = JSON.stringify({
      ...subjectsRow
    })
    const headers = {'Content-Type': 'application/json'}
    const method = 'POST'

    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }

  getSubjectsRows = () => {
    const url = `${ENDPOINTS.GET_ALL_SUBJECTS}`
    return fetch(url)
  }

}

export default new SubjectsFetcher()
