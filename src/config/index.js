const host = '//localhost:5000'

const API_PATH = `${host}`

export const ENDPOINTS = {
  GET_ALL_EDUCATIONAL_PLAN: `${API_PATH}/educationalPlan`,
  CREATE_EDUCATIONAL_ROW: `${API_PATH}/educationalPlan`,
  REMOVE_EDUCATIONAL_ROW: `${API_PATH}/educationalPlan`,

  GET_ALL_SUBJECTS: `${API_PATH}/subjects`,
  CREATE_SUBJECTS_ROW: `${API_PATH}/subjects`
}

