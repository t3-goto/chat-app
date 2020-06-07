// ______________________________________________________
//
// Use jwt Library 'jsonwebtoken'.
// For more details:
// https://github.com/auth0/node-jsonwebtoken and https://www.npmjs.com/package/jsonwebtoken
//
import jwt from 'jsonwebtoken'
import { envVars } from './../config/env'
import { jwtConfigParam, Payload } from './../config/jwt'
import { SystemError } from './../errors/systemError'
import { TokenInvalidError } from './../errors/tokenInvalidError'
// ______________________________________________________
//
// Method: Generate JWT Token From Payload Data
//
export const genToken = (payload: Payload): Promise<string> => {
  return new Promise<string>((resovle, reject) => {
    try {
      if (envVars.SECRET_KEY === undefined) {
        return reject(new SystemError())
      }
      const token = jwt.sign({ payload }, envVars.SECRET_KEY, {
        ...jwtConfigParam,
      })
      return resovle(token)
    } catch {
      return reject(new SystemError())
    }
  })
}
// ______________________________________________________
//
// Method: Verify JWT Token
//
export const verifyToken = (token: string): Promise<Payload> => {
  return new Promise<Payload>((resolve, reject) => {
    if (envVars.SECRET_KEY === undefined) {
      return reject(new SystemError())
    }
    jwt.verify(token, envVars.SECRET_KEY as string, (err, decoded) => {
      if (err) {
        return reject(new TokenInvalidError('token is invalid'))
      }
      if (decoded === undefined) {
        return reject(new TokenInvalidError('decoded payload is not found'))
      }
      return resolve(decoded as Payload)
    })
  })
}
// ______________________________________________________
//
// Method: Remove 'Bearer ' From Authentication Header
//
export const stripBearer = (value: string): string => {
  if (value === null) {
    throw new SystemError()
  }
  return value.replace(/Bearer\s/, '')
}
