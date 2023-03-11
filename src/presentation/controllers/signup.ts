import type { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const REQUIRED_FIELDS = ['name', 'email', 'password', 'passwordConfirmation']

    for (const FIELD of REQUIRED_FIELDS) {
      if (!httpRequest.body[FIELD]) {
        return badRequest(new MissingParamError(FIELD))
      }
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
