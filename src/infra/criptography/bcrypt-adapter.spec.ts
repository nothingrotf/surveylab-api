import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hash') })
  },
  async compare (): Promise<boolean> {
    return await new Promise(resolve => { resolve(true) })
  }
}))

interface SutTypes {
  sut: BcryptAdapter
  SALT: number
}

const makeSut = (): SutTypes => {
  const SALT = 12
  const sut = new BcryptAdapter(SALT)

  return { sut, SALT }
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const { sut, SALT } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  test('Should return a valid hash on hash success', async () => {
    const { sut } = makeSut()
    const hash = await sut.hash('any_value')

    expect(hash).toBe('hash')
  })

  test('Should throw if Bcrypt throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.hash('any_value')

    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const { sut } = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')

    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true when compare success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')

    expect(isValid).toBeTruthy()
  })
})
