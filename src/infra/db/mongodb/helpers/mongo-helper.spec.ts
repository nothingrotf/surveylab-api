import { MongoHelper as sut } from './index'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getColletion('accounts')
    expect(accountCollection).toBeTruthy()

    await sut.disconnect()

    accountCollection = await sut.getColletion('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
