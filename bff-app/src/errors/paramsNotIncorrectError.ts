export class ParamsNotIncorrectError extends Error {
  public name = 'ParamsNotIncorrectError'

  constructor(public message: string = 'Target Params are not incorrect') {
    super(message)
  }
}
