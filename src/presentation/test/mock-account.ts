import type { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import type { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import type { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import type { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string | undefined): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByTokenStub()
}
