export interface Response {
  data: any
  error: Error
}
export interface Error {
  code: string
  message: string
  info: string
}
