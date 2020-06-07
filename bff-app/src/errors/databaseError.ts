export class DatabaseError extends Error {
  public name = 'DatabaseError'

  constructor(public message: string = 'database connection error occurs') {
    super(message)
  }
}
