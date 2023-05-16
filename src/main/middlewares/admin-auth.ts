import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/login-controller-factory'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
