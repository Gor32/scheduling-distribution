import EducationalDataFetcher from './api.educationalRow'
import SubjectsFetcher from './api.subjects'
import ChairsFetcher from './api.chairs'
import ClassifiersFetcher from './api.classifiers'
import StreamsFetcher from  './api.streams'
import ParamsFetcher from  './api.params'

class Fetcher {
  educationalData = EducationalDataFetcher
  subjects = SubjectsFetcher
  chairs = ChairsFetcher
  classifiers = ClassifiersFetcher
  streams = StreamsFetcher
  params = ParamsFetcher
}

export default new Fetcher()
