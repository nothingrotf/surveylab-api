import { loginPath, surveyPath } from './paths'
import { badRequest, notFound, serverError, unauthorized, forbidden } from './components'
import { accountSchema, addSurveyParamsSchema, apiKeyAuthSchema, errorSchema, loginParamsSchema, signUpParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema } from './schemas'
import { signUpPath } from './paths/signup-path'

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
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/survey': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema,
    surveyAnswer: surveyAnswerSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    addSurveyParams: addSurveyParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    serverError,
    notFound,
    forbidden
  }
}
