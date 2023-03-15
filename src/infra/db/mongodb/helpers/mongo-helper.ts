import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string) {
    this.uri = uri
    this.client = await MongoClient.connect(this.uri, {})
  },

  async disconnect () {
    if (this.client) {
      await this.client.close()
    }
  },

  getColletion (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (data: any): any {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  }
}
