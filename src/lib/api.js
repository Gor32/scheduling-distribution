import EducationalDataFetcher from './api.educationalRow'
import SubjectsFetcher from './api.subjects'

class Fetcher {
  educationalData = EducationalDataFetcher
  subjects = SubjectsFetcher
}

export default new Fetcher()
