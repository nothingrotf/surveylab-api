import type { Hasher } from '@/data/protocols/criptography/hasher'
import type { Decrypter } from '@/data/protocols/criptography/decrypter'
import type { Encrypter } from '@/data/protocols/criptography/encrypter'
import type { HashComparer } from '@/data/protocols/criptography/hash-comparer'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new HasherStub()
}

export const mockDecrypter = (): Decrypter => {
  class DescrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DescrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_token'
    }
  }
  return new EncrypterStub()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }
  return new HashComparerStub()
}
