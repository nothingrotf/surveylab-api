import type { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import type { SurveyResultModel } from '@/domain/models/survey-result'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 0,
    percent: 0
  }, {
    answer: 'other_answer',
    count: 0,
    percent: 0
  }],
  date: new Date()
})
