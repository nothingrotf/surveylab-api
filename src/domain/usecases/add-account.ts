import type { AccountModel } from '../models/account'

export type AddAccountModel = Omit<AccountModel, 'id' | 'role'>

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | null>
}
