export class RecordNotFoundError extends Error {
  public name = 'RecordNotFoundError'

  constructor(public message: string = 'target record is not founc') {
    super(message)
  }
}
