import Express from 'express'
import { ParamsValidationError } from './../../errors/paramsValidationError'
// ______________________________________________________
//
// Method: Validate Request Body
//
export const validateRequestBody = (
  req: Express.Request,
  params: string[]
): Promise<null> => {
  return new Promise<null>((resolve, reject) => {
    if (!req.body == null) {
      return reject(new ParamsValidationError('Request body is not setted'))
    }
    params.forEach((param) => {
      if (req.body[param] == null) {
        return reject(
          new ParamsValidationError('Some required request body is not setted')
        )
      }
    })
    return resolve()
  })
}
// ______________________________________________________
//
// Method: Validate Request Params
//
export const validateRequestParams = (
  req: Express.Request,
  params: string[]
): Promise<null> => {
  return new Promise<null>((resolve, reject) => {
    if (!req.params == null) {
      return reject(new ParamsValidationError('Request params is not setted'))
    }

    params.forEach((param) => {
      if (req.params[param] == null) {
        return reject(
          new ParamsValidationError(
            'Some required request params is not setted'
          )
        )
      }
    })
    return resolve()
  })
}
