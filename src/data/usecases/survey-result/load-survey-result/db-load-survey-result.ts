import type { LoadSurveyResultRepository, SurveyResultModel, LoadSurveyResult } from './db-save-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null as unknown as SurveyResultModel
  }
}
