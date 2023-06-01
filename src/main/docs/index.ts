import { loginPath } from './paths'
import { badRequest, notFound, serverError, unauthorized } from './components'
import { accountSchema, errorSchema, loginParamsSchema } from './schemas'

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
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    unauthorized,
    serverError,
    notFound
  }
}
