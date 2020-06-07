import Express from 'express'
import { TokenInvalidError } from './../errors/tokenInvalidError'
import { stripBearer, verifyToken } from './../helpers/jwt'
import { Response, sendResponse } from './../helpers/response'
// ______________________________________________________
//
// Authentication Headers Keyword
//
const TOKEN_HEADER = 'x-auth-token'
const BEARER = 'Bearer'
// ______________________________________________________
//
// Validate Requet Authentication Headers
//
const validateAuthHeader = (req: Express.Request) => {
  return (
    req.headers == null ||
    req.headers[TOKEN_HEADER] == null ||
    req.headers[TOKEN_HEADER] === undefined ||
    !req.headers[TOKEN_HEADER]?.includes(BEARER)
  )
}
// ______________________________________________________
//
// Defines All Of The Application Authentication Middlewares
//
export const setAuthMiddleware = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    if (validateAuthHeader(req)) {
      throw new TokenInvalidError()
    }

    const token = stripBearer(req.headers[TOKEN_HEADER] as string)
    await verifyToken(token).catch((err: Error) => {
      throw new TokenInvalidError(err.message)
    })
    next()
  } catch (e) {
    if (e instanceof TokenInvalidError) {
      const response = new Response({
        error: {
          code: 'MIAU000001',
          message: 'Authentication error occurs',
        },
      })
      return sendResponse(res, 422, response)
    }
    {
      const response = new Response({
        error: {
          code: 'MIAU000002',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
