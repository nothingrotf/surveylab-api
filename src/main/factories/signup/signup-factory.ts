import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import type { Controller } from '../../../presentation/protocols'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeSignUpValidation } from './signup-validation-factory'
import env from '../../config/env'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'

export const makeSignUpController = (): Controller => {
  const SALT = 12
  const bcryptAdapter = new BcryptAdapter(SALT)
  const addAccountRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository, accountMongoRepository)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation(), dbAuthentication)
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
