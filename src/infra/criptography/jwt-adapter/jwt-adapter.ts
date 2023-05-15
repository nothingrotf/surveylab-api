import type { Decrypter } from '../../../data/protocols/criptography/decrypter'
import type { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }

  async decrypt (value: string): Promise<string | null> {
    return jwt.verify(value, this.secret) as string
  }
}
