export class TokenInvalidError extends Error {
  public name = 'TokenInvalidError'

  constructor(public message: string = 'invalid token error occurs') {
    super(message)
  }
}
