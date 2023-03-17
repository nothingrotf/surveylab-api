import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string) {
    this.uri = uri
    this.client = await MongoClient.connect(this.uri, {})
  },

  async disconnect () {
    await this.client.close()
    this.client = null
  },

  async getColletion (name: string): Promise<Collection> {
    if (!this.client ?? !this.client.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map (data: any): any {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  }
}
