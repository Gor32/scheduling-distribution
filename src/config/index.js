const host = '//localhost:5000'

const API_PATH = `${host}`

export const ENDPOINTS = {
  GET_ALL_EDUCATIONAL_PLAN: `${API_PATH}/educationalPlan`,
  GET_EDUCATIONAL_PLAN_BY_CLASSIFIER: `${API_PATH}/educationalPlan`,
  CREATE_EDUCATIONAL_ROW: `${API_PATH}/educationalPlan`,
  REMOVE_EDUCATIONAL_ROW: `${API_PATH}/educationalPlan`,

  GET_ALL_SUBJECTS: `${API_PATH}/subjects`,
  CREATE_SUBJECTS_ROW: `${API_PATH}/subjects`,
  REMOVE_SUBJECTS_ROW: `${API_PATH}/subjects`,

  GET_ALL_CHAIRS: `${API_PATH}/chairs`,
  CREATE_CHAIRS_ROW: `${API_PATH}/chairs`,
  REMOVE_CHAIRS_ROW: `${API_PATH}/chairs`,

  GET_ALL_CLASSIFIERS: `${API_PATH}/classifiers`,
  GET_ALL_DISTINCT_CLASSIFIERS: `${API_PATH}/classifiers/distinctClassifiers`,
  CREATE_CLASSIFIERS_ROW: `${API_PATH}/classifiers`,
  REMOVE_CLASSIFIERS_ROW: `${API_PATH}/classifiers`,
}

