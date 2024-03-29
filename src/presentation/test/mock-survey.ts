import type { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import type { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import type { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import type { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveysModel } from '@/domain/test'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (survey: AddSurveyParams): Promise<void> {
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return mockSurveysModel()
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdStub()
}
