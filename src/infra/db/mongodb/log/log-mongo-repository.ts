import type { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { MongoHelper } from '../helpers'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getColletion('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
