import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import type { Controller } from '../../../presentation/protocols'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { LogControllerDecorator } from '../../decorators/log'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const SALT = 12
  const bcryptAdapter = new BcryptAdapter(SALT)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}