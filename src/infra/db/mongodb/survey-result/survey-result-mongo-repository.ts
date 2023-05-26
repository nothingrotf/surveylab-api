import type { SurveyResultModel } from '@/domain/models/survey-result'
import type { SaveSurveyResult, SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResult {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getColletion('surveyResults')
    const survey = await surveyResultCollection.findOneAndUpdate({
      surveId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })
    return survey && MongoHelper.map(survey.value)
  }
}
