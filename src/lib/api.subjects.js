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

  removeSubjectsRow = rowId => {
    const url = `${ENDPOINTS.REMOVE_SUBJECTS_ROW}/${rowId}`
    const headers = {'Content-Type': 'application/json'}
    const method = 'DELETE'
    const body = JSON.stringify({})
    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }
}

export default new SubjectsFetcher()
