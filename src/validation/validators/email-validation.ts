import { InvalidParamError } from '../../presentation/errors'
import type { EmailValidator } from '../protocols/email-validator'
import type { Validation } from '../../presentation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | undefined {
    const emailIsValid = this.emailValidator.isValid(input[this.fieldName])

    if (!emailIsValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
