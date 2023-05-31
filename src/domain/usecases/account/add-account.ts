import type { AccountModel } from '../../models/account'

export type AddAccountParams = Omit<AccountModel, 'id' | 'role'>

export interface AddAccount {
  add: (account: AddAccountParams) => Promise<AccountModel | null>
}
