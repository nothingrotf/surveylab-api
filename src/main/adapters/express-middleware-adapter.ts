import type { HttpRequest, HttpResponse, Middleware } from '../../presentation/protocols'
import type { NextFunction, Request, Response } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse: HttpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      req = { ...req, ...httpResponse.body }
      next()
    } else {
      res
        .status(httpResponse.statusCode)
        .json({
          error: httpResponse.body.message
        })
    }
  }
}
