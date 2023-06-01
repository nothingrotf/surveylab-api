import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'SurveyLab API',
    description: 'API from SurveyLab project',
    version: '1.0.0'
  },
  license: {
    name: 'ISC',
    url: 'https://spdx.org/licenses/ISC.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Survey'
  }],
  paths,
  schemas,
  components
}
