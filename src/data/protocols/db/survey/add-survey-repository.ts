import type { AddSurveyModel } from '../../../usecases/add-survey/db-add-account-protocols'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
