import { Response } from './response'
export interface GET {
  '/api/v1/users/:id': {
    req: { params: { id: string } }
    res: Response
  }
  '/api/v1/users': {
    res: Response
  }
}
export interface POST {
  '/api/v1/users': {
    req: {
      body: {
        email: string
        password: string
        provider: string
        firstName: string
        lastName: string
      }
    }
    res: Response
  }
  '/api/v1/sessions': {
    req: { params: { id: string } }
    res: Response
  }
}
export interface PUT {
  '/api/v1/users/:id': {
    req: {
      params: { id: string }
      body: {
        email: string
        password: string
        provider: string
        firstName: string
        lastName: string
      }
    }
    res: Response
  }
}
export interface DELETE {
  '/api/v1/users/:id': {
    req: { params: { id: string } }
    res: Response
  }
}
