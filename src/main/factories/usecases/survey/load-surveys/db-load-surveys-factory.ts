import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository'
import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/db-load-survey'

export const makeDbLoadSurveys = (): DbLoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
