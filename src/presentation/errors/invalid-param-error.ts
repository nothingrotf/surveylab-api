export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid the parameter: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
