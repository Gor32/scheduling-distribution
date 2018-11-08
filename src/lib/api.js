import EducationalDataFetcher from './api.educationalRow'
import SubjectsFetcher from './api.subjects'
import ChairsFetcher from './api.chairs'
import ClassifiersFetcher from './api.classifiers'

class Fetcher {
  educationalData = EducationalDataFetcher
  subjects = SubjectsFetcher
  chairs = ChairsFetcher
  classifiers = ClassifiersFetcher
}

export default new Fetcher()
