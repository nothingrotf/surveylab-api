import { MissingParamError } from '@/presentation/errors'
import type { Validation } from '@/presentation/protocols'
import { ValidationComposite } from './validation-composite'
import { mockValidation } from '@/presentation/test'

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationStubs)

  return { sut, validationStubs }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fail', () => {
    const { sut, validationStubs } = makeSut()

    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(
      new MissingParamError('field')
    )

    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more then one validation fail', () => {
    const { sut, validationStubs } = makeSut()

    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(
      new Error()
    )
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(
      new MissingParamError('field')
    )

    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new Error())
  })

  test('Should not return if succed', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
