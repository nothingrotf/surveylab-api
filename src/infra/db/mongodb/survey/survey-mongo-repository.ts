import { ObjectId } from 'mongodb'
import type { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import type { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { MongoHelper } from '../helpers'
import type { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import type { SurveyModel } from '@/domain/models/survey'
import type { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add (surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getColletion('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getColletion('surveys')
    const surveys = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getColletion('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
