import Express from 'express'
import moment from 'moment'
import { Payload } from './../../../../config/jwt'
import { DatabaseError } from './../../../../errors/databaseError'
import { ParamsNotIncorrectError } from './../../../../errors/paramsNotIncorrectError'
import { ParamsValidationError } from './../../../../errors/paramsValidationError'
import { RecordNotFoundError } from './../../../../errors/recordNotFoundError'
import { comparePlainWithHash } from './../../../../helpers/bcrypt'
import { genToken } from './../../../../helpers/jwt'
import { sendResponse } from './../../../../helpers/response'
import { UserDbDao } from './../../../../models/user'
import { validateRequestBody } from './../../../concerns/validate'
import { CreateSessionResponse } from './sessions-response'
// ______________________________________________________
//
// Define Controller Method For POST /api/v1/sessions
//
export const createSession = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    await validateRequestBody(req, ['email', 'password', 'provider'])
    const user = await UserDbDao.selectByEmail(req.body.email)
    if (!comparePlainWithHash(req.body.password, user.password)) {
      throw new ParamsNotIncorrectError('Password Is Incorrect')
    }
    const today = moment().format('YYYYMMDD')
    if (user.loginDate !== today) {
      user.loginDate = today
      await UserDbDao.update(user)
    }
    const payload: Payload = {
      userId: user.id,
    }
    const token = await genToken(payload)
    const response = new CreateSessionResponse({ data: { token } })
    return sendResponse(res, 200, response)
  } catch (e) {
    if (e instanceof ParamsValidationError) {
      const response = new CreateSessionResponse({
        error: {
          code: 'COSEPO0001',
          message: 'Some request parameter is invalid',
        },
      })
      return sendResponse(res, 422, response)
    }
    if (e instanceof DatabaseError) {
      const response = new CreateSessionResponse({
        error: {
          code: 'COSEPO0002',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    } else if (e instanceof RecordNotFoundError) {
      const response = new CreateSessionResponse({
        error: {
          code: 'COSEPO0003',
          message: e.message !== null ? e.message : 'Target User IS Not Found',
        },
      })
      return sendResponse(res, 404, response)
    } else if (e instanceof ParamsNotIncorrectError) {
      const response = new CreateSessionResponse({
        error: {
          code: 'COSEPO0004',
          message:
            e.message !== null ? e.message : 'Target Params Are Not Incorrect',
        },
      })
      return sendResponse(res, 404, response)
    } else {
      const response = new CreateSessionResponse({
        error: {
          code: 'COSEPO0005',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
