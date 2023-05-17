import type { SurveyModel, LoadSurveys, LoadSurveysRepository } from './db-load-survey-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveyRepository: LoadSurveysRepository
  ) {}

  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveyRepository.loadAll()
    return surveys
  }
}
