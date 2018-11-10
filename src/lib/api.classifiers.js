import { ENDPOINTS } from '../config'
import { jsonify } from '../util'

const options = {
  credentials: 'same-origin'
}

class ClassifiersFetcher {

  createClassifiersRow = classifiersRow =>{
    const url = `${ENDPOINTS.CREATE_CLASSIFIERS_ROW}`
    const body = JSON.stringify({
      ...classifiersRow
    })
    const headers = {'Content-Type': 'application/json'}
    const method = 'POST'

    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }

  getClassifiersRows = () => {
    const url = `${ENDPOINTS.GET_ALL_CLASSIFIERS}`
    return fetch(url)
  }

  getDistinctClassifiersRows = () => {
    const url = `${ENDPOINTS.GET_ALL_DISTINCT_CLASSIFIERS}`
    return fetch(url)
  }


  removeClassifiersRow = rowId => {
    const url = `${ENDPOINTS.REMOVE_CLASSIFIERS_ROW}/${rowId}`
    console.log(url, '   ', rowId)
    const headers = {'Content-Type': 'application/json'}
    const method = 'DELETE'
    const body = JSON.stringify({})
    return fetch(url, {...options, body, headers, method}).then(jsonify)
  }
}

export default new ClassifiersFetcher()
