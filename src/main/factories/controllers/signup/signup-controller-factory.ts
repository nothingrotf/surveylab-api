import type { Controller } from '../../../../presentation/protocols'
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../usecases/db-add-account/db-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
