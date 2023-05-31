import type { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import type { SurveyResultModel } from '@/domain/models/survey-result'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  id: 'any_id',
  ...mockSaveSurveyResultParams()
})
