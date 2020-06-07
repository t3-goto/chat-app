import Express from 'express'
import moment from 'moment'
import { DatabaseError } from './../../../../errors/databaseError'
import { ParamsValidationError } from './../../../../errors/paramsValidationError'
import { RecordNotFoundError } from './../../../../errors/recordNotFoundError'
import { comparePlainWithHash, genHash } from './../../../../helpers/bcrypt'
import { sendResponse } from './../../../../helpers/response'
import { User, UserDbDao } from './../../../../models/user'
import {
  validateRequestBody,
  validateRequestParams,
} from './../../../concerns/validate'
import {
  AddUserResponse,
  DeleteUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
} from './users-response'
// ______________________________________________________
//
// Define Controller Method For POST /api/v1/users
//
export const addUser = async (req: Express.Request, res: Express.Response) => {
  try {
    await validateRequestBody(req, ['email', 'password', 'provider'])
    const today = moment().format('YYYYMMDD')
    const user = new User({
      email: req.body.email,
      password: genHash(req.body.password),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      provider: req.body.provider,
      loginDate: '',
      reqDate: today,
      modDate: today,
    })
    await UserDbDao.insert(user)
    const response = new AddUserResponse({ data: user })
    return sendResponse(res, 201, response)
  } catch (e) {
    if (e instanceof ParamsValidationError) {
      const response = new AddUserResponse({
        error: {
          code: 'COCOPO0001',
          message:
            e.message !== null
              ? e.message
              : 'Some request parameter is invalid',
        },
      })
      return sendResponse(res, 422, response)
    }
    if (e instanceof DatabaseError) {
      const response = new AddUserResponse({
        error: {
          code: 'COUSPO0002',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    } else {
      const response = new AddUserResponse({
        error: {
          code: 'COUSPO0003',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
// ______________________________________________________
//
// Define Controller Method For GET /api/v1/users
//
export const getUsers = async (req: Express.Request, res: Express.Response) => {
  try {
    const users = await UserDbDao.selectAll()
    const response = new GetUsersResponse({
      data: users,
    })
    return sendResponse(res, 200, response)
  } catch (e) {
    if (e instanceof DatabaseError) {
      const response = new GetUsersResponse({
        error: {
          code: 'COUSGE0001',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
    {
      const response = new GetUsersResponse({
        error: {
          code: 'COUSGE0002',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
// ______________________________________________________
//
// Define Controller Method For GET /api/v1/user/id
//
export const getUser = async (req: Express.Request, res: Express.Response) => {
  try {
    await validateRequestParams(req, ['id'])
    const userId = req.params.id
    const user = await UserDbDao.selectById(userId)
    const response = new GetUserResponse({
      data: user,
    })
    return sendResponse(res, 200, response)
  } catch (e) {
    if (e instanceof ParamsValidationError) {
      const response = new GetUserResponse({
        error: {
          code: 'COUSGE1001',
          message:
            e.message !== null
              ? e.message
              : 'Some request parameter is invalid',
        },
      })
      return sendResponse(res, 404, response)
    }
    if (e instanceof DatabaseError) {
      const response = new GetUserResponse({
        error: {
          code: 'COUSGE0002',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    } else if (e instanceof RecordNotFoundError) {
      const response = new GetUserResponse({
        error: {
          code: 'COUSGE0003',
          message: e.message !== null ? e.message : 'Target User IS Not Found',
        },
      })
      return sendResponse(res, 404, response)
    } else {
      const response = new GetUserResponse({
        error: {
          code: 'COUSGE1004',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
// ______________________________________________________
//
// Define Controller Method For PUT /api/v1/users/id
//
export const updateUser = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    await validateRequestParams(req, ['id'])
    await validateRequestBody(req, ['email', 'password', 'provider'])
    const userId = req.params.id
    const user = await UserDbDao.selectById(userId)

    interface IsModifiedObj {
      [key: string]: boolean
    }
    const isModifiedObj: IsModifiedObj = {
      email: false,
      password: false,
      firstName: false,
      lastName: false,
      provider: false,
    }
    if (user.email !== req.body.email) {
      isModifiedObj.email = true
      user.email = req.body.email
    }
    if (user.firstName !== req.body.firstName) {
      isModifiedObj.firstName = true
      user.firstName = req.body.firstName
    }
    if (user.lastName !== req.body.lastName) {
      isModifiedObj.lastName = true
      user.lastName = req.body.lastName
    }
    if (user.provider !== req.body.provider) {
      isModifiedObj.provider = true
      user.provider = req.body.provider
    }
    if (!comparePlainWithHash(req.body.password, user.password)) {
      isModifiedObj.password = true
      console.log(user.password)
      user.password = genHash(req.body.password)
    }
    let isModified = false
    for (const isModifiedObjKey in isModifiedObj) {
      if (isModifiedObj[isModifiedObjKey]) {
        isModified = true
        break
      }
    }
    if (isModified) {
      user.modDate = moment().format('YYYYMMDD')
      await UserDbDao.update(user)
      const response = new UpdateUserResponse({
        data: user,
      })
      return sendResponse(res, 200, response)
    }
    {
      const response = new UpdateUserResponse({})
      return sendResponse(res, 304, response)
    }
  } catch (e) {
    if (e instanceof ParamsValidationError) {
      const response = new UpdateUserResponse({
        error: {
          code: 'COUSPU0001',
          message:
            e.message !== null
              ? e.message
              : 'Some request parameter is invalid',
        },
      })
      return sendResponse(res, 404, response)
    }
    if (e instanceof DatabaseError) {
      const response = new UpdateUserResponse({
        error: {
          code: 'COUSPU0002',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    } else if (e instanceof RecordNotFoundError) {
      const response = new UpdateUserResponse({
        error: {
          code: 'COUSPU0003',
          message: e.message !== null ? e.message : 'Target User IS Not Found',
        },
      })
      return sendResponse(res, 404, response)
    } else {
      const response = new UpdateUserResponse({
        error: {
          code: 'COUSPU0004',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
// ______________________________________________________
//
// Define Controller Method For DELETE /api/v1/comments/id
//
export const deleteUser = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    await validateRequestParams(req, ['id'])
    const userId = req.params.id
    const user = await UserDbDao.selectById(userId)
    await UserDbDao.delete(user)
    const response = new DeleteUserResponse({})
    return sendResponse(res, 204, response)
  } catch (e) {
    if (e instanceof ParamsValidationError) {
      const response = new DeleteUserResponse({
        error: {
          code: 'COUSDE0001',
          message:
            e.message !== null
              ? e.message
              : 'Some request parameter is invalid',
        },
      })
      return sendResponse(res, 404, response)
    }
    if (e instanceof DatabaseError) {
      const response = new DeleteUserResponse({
        error: {
          code: 'COUSDE0002',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    } else if (e instanceof RecordNotFoundError) {
      const response = new DeleteUserResponse({
        error: {
          code: 'COUSDE0003',
          message: e.message !== null ? e.message : 'Target User IS Not Found',
        },
      })
      return sendResponse(res, 404, response)
    } else {
      const response = new DeleteUserResponse({
        error: {
          code: 'COUSDE0004',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
