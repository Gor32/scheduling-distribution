import EducationalDataFetcher from './api.educationalRow'
import SubjectsFetcher from './api.subjects'
import ChairsFetcher from './api.chairs'

class Fetcher {
  educationalData = EducationalDataFetcher
  subjects = SubjectsFetcher
  chairs = ChairsFetcher
}

export default new Fetcher()
