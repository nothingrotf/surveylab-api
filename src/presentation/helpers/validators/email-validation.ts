import { InvalidParamError } from '../../errors'
import type { EmailValidator } from '../../protocols'
import type { Validation } from './validation'

export class EmailValidation implements Validation {
  private readonly fieldName: string
  private readonly emailValidator: EmailValidator

  constructor (fieldName: string, emailValidator: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error | undefined {
    const emailIsValid = this.emailValidator.isValid(input[this.fieldName])

    if (!emailIsValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}