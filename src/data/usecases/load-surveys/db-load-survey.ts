import type { SurveyModel } from '../../../domain/models/survey'
import type { LoadSurveys } from '../../../domain/usecases/load-surveys'
import type { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveyRepository: LoadSurveysRepository
  ) {}

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveyRepository.loadAll()
    return []
  }
}