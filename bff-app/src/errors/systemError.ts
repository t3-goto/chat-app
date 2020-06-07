export class SystemError extends Error {
  public name = 'SystemError'

  constructor(public message: string = 'system error occurs') {
    super(message)
  }
}
