import type { Controller, Authentication, EmailValidator, HttpRequest, HttpResponse } from './login-protocols'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const REQUIRED_FIELDS = ['email', 'password']

      for (const FIELD of REQUIRED_FIELDS) {
        if (!httpRequest.body[FIELD]) {
          return badRequest(new MissingParamError(FIELD))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }

      return ok({
        accessToken
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
