import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers'
import type { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getColletion('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Gabriel',
          email: 'aguiargabriel1983@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)

      await accountCollection.insertOne({
        name: 'Gabriel',
        email: 'aguiargabriel1983@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'aguiargabriel1983@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on unauthorized', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'aguiargabriel1983@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
