import type { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const REQUIRED_FIELDS = ['name', 'email']

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
