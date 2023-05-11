import type { HttpResponse } from '../protocols'
import { forbidden } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError } from '../errors'

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse: HttpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
