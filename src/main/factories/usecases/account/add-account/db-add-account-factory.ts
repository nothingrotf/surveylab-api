import type { AddAccount } from '@/domain/usecases/add-account'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'

export const makeDbAddAccount = (): AddAccount => {
  const SALT = 12
  const bcryptAdapter = new BcryptAdapter(SALT)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccountRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, addAccountRepository, accountMongoRepository)
}
