import type { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { AddSurveyController } from '@/presentation/controllers/suvey/add-survey/add-survey-controller'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDbAddSuvey } from '@/main/factories/usecases/survey/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeDbAddSuvey(), makeAddSurveyValidation())
  return makeLogControllerDecorator(addSurveyController)
}
