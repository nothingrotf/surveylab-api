export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing the parameter: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
