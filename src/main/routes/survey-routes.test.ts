import type { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getColletion('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getColletion('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'This is working?',
          answers: [{
            image: 'http://image-name.com',
            answer: 'Yes'
          }, {
            answer: 'False'
          }]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'Gabriel',
        email: 'aguiargabriel1983@gmail.com',
        password: '123',
        role: 'admin'
      })
      const accessToken = sign({ id: result.insertedId }, env.jwtSecret)
      await accountCollection.updateOne({ _id: result.insertedId }, { $set: { accessToken } })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'This is working?',
          answers: [{
            image: 'http://image-name.com',
            answer: 'Yes'
          }, {
            answer: 'False'
          }]
        })
        .expect(204)
    })
  })
})
