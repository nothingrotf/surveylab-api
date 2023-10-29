import { forbidden } from '@/presentation/helpers/http/http-helper'
import type { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveyResult = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    if (!surveyResult) {
      return forbidden(new InvalidParamError('surveyId'))
    }
    return null as unknown as HttpResponse
  }
}
