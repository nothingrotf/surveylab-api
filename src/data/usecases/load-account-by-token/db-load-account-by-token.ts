import type { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import type { Decrypter } from '../../protocols/criptography/decrypter'
import type { AccountModel } from '../add-account/db-add-account-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly Decrypter: Decrypter
  ) {}

  async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    await this.Decrypter.decrypt(accessToken)
    return null
  }
}
