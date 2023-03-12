export class ServerError extends Error {
  constructor () {
    super('an internal server error occurred, please contact the support')
    this.name = 'ServerError'
  }
}
