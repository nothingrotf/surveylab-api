import type { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import type { LoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import type { SurveyModel } from '../load-surveys/db-load-survey-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<SurveyModel | null> {
    await this.loadSurveyByIdRepository.loadById(id)
    return null
  }
}
