import type { HttpResponse, LoadSurveys, SurveyModel } from './load-surveys-controller-protocols'
import { LoadSurveysController } from './load-surveys-controller'
import { ok, serverError } from '../../../helpers/http/http-helper'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }, {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return makeFakeSurveys()
    }
  }
  return new LoadSurveysStub()
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return { sut, loadSurveysStub }
}

describe('LoadSurveys Controller', () => {
  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadStub = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadStub).toBeCalled()
  })

  test('should returns 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(
      new Promise((resolve, reject) => { reject(new Error()) })
    )
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})