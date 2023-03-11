import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return status 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'emailTeste@gmail.com',
        password: 'testePassword',
        passwordConfirmation: 'testePassword'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
