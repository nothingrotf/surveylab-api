import type { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const REQUIRED_FIELDS = ['name', 'email', 'password', 'passwordConfirmation']

    for (const FIELD of REQUIRED_FIELDS) {
      if (!httpRequest.body[FIELD]) {
        return badRequest(new MissingParamError(FIELD))
      }
    }

    const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!emailIsValid) {
      return badRequest(new InvalidParamError('email'))
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
