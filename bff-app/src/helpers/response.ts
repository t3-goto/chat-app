import Express from 'express'
// ______________________________________________________
//
// Method: Send Response
//
export const sendResponse = (
  res: Express.Response,
  statusCode: number,
  data: Response<ResponseProps>
) => {
  res.status(statusCode).send(data)
}
// ______________________________________________________
//
// Define Error Schema For Response Schema
//
export interface ErrorProps {
  code?: string
  message?: string
  info?: string
}
export class Error<T extends ErrorProps> {
  code?: T['code']
  message?: T['message']
  info?: T['info']
  constructor(props: T) {
    this.code = props.code === undefined ? '' : props.code
    this.message = props.message === undefined ? '' : props.message
    this.info = props.info === undefined ? '' : props.info
  }
}
// ______________________________________________________
//
// Define Response Schema
//
export interface ResponseProps {
  data?: any
  error?: ErrorProps
}
export class Response<T extends ResponseProps> {
  data?: T['data']
  error?: T['error']
  constructor(props: T) {
    this.data = props.data === undefined ? '' : props.data
    this.error =
      props.error === undefined
        ? { code: '', message: '', info: '' }
        : new Error(props.error)
  }
}
