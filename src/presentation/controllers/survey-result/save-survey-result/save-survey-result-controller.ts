import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import type { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult } from './save-survey-result-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
        await this.saveSurveyResult.save({
          accountId: httpRequest.accountId as string,
          answer,
          surveyId,
          date: new Date()
        })
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null as unknown as HttpResponse
    } catch (error) {
      return serverError(error)
    }
  }
}
