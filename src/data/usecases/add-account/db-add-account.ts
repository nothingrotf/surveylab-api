import type { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    await this.loadAccountByEmailRepositoryStub.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })

    return account
  }
}
