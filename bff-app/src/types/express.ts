import { Express } from 'express'
import { HttpError } from 'http-errors'
import * as methods from './methods'

declare module 'express' {
  interface RequestParams {
    query?: any
    params?: any
    body?: any
  }

  interface ExRequest<T extends RequestParams> extends Express.Request {
    query: T['query']
    params: T['params']
    body: T['body']
  }

  interface ExResponse<T> extends Express.Response {
    send: (body?: T) => ExResponse<T>
  }

  type ExNextFunction = (err?: HttpError) => void

  type ExRequestHandler<T extends { req?: any; res?: any }> = (
    req: ExRequest<T['req']>,
    res: ExResponse<T['res']>,
    next: ExNextFunction
  ) => any
  interface Application {
    get: (<P extends keyof methods.GET>(
      path: P,
      ...requestHandlers: ExRequestHandler<methods.GET[P]>[]
    ) => any) &
      IRouterMatcher<this>

    post: (<P extends keyof methods.POST>(
      path: P,
      ...requestHandlers: ExRequestHandler<methods.POST[P]>[]
    ) => any) &
      IRouterMatcher<this>

    put: (<P extends keyof methods.PUT>(
      path: P,
      ...requestHandlers: ExRequestHandler<methods.PUT[P]>[]
    ) => any) &
      IRouterMatcher<this>
  }
}
