export class ServerError extends Error {
  constructor (stack?: string) {
    super('an internal server error occurred, please contact the support')
    this.name = 'ServerError'
    this.stack = stack
  }
}
