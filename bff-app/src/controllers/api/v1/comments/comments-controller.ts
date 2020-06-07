import Express from 'express'
import { DatabaseError } from './../../../../errors/databaseError'
import { ParamsValidationError } from './../../../../errors/paramsValidationError'
import { RecordNotFoundError } from './../../../../errors/recordNotFoundError'
import { sendResponse } from './../../../../helpers/response'
import { Comment, CommentDbDao } from './../../../../models/comment'
import {
  validateRequestBody,
  validateRequestParams,
} from './../../../concerns/validate'
import {
  AddCommentResponse,
  DeleteCommentResponse,
  GetCommentResponse,
  GetCommentsResponse,
  UpdateCommentResponse,
} from './comments-response'
// ______________________________________________________
//
// Define Controller Method For POST /api/v1/users
//
export const addComment = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    await validateRequestBody(req, ['user', 'content'])
    const now = new Date().getTime()
    const comment = new Comment({
      content: req.body.content,
      regDatetime: now,
      modDatetime: now,
      user: {
        userId: req.body.user._id,
        fullName: req.body.user.firstName + ' ' + req.body.user.lastName,
        initial: req.body.user.firstName[0].toUpperCase(),
      },
    })
    await CommentDbDao.insert(comment)
    const response = new AddCommentResponse({ data: comment })
    return sendResponse(res, 201, response)
  } catch (e) {
    if (e instanceof ParamsValidationError) {
      const response = new AddCommentResponse({
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
      const response = new AddCommentResponse({
        error: {
          code: 'COCOPO0002',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    } else {
      const response = new AddCommentResponse({
        error: {
          code: 'COCOPO0003',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
// ______________________________________________________
//
// Define Controller Method For GET /api/v1/comments
//
export const getComments = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const comments = await CommentDbDao.selectAll()
    const response = new GetCommentsResponse({
      data: comments,
    })
    return sendResponse(res, 200, response)
  } catch (e) {
    if (e instanceof DatabaseError) {
      const response = new GetCommentsResponse({
        error: {
          code: 'COCOGE0001',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
    {
      const response = new GetCommentsResponse({
        error: {
          code: 'COCOGE0002',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
// ______________________________________________________
//
// Define Controller Method For GET /api/v1/comments/id
//
export const getComment = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    await validateRequestParams(req, ['id'])
    const commentId = req.params.id
    const comment = await CommentDbDao.selectById(commentId)
    const response = new GetCommentResponse({
      data: comment,
    })
    return sendResponse(res, 200, response)
  } catch (e) {
    if (e instanceof ParamsValidationError) {
      const response = new GetCommentResponse({
        error: {
          code: 'COCOGE1001',
          message:
            e.message !== null
              ? e.message
              : 'Some request parameter is invalid',
        },
      })
      return sendResponse(res, 404, response)
    }
    if (e instanceof DatabaseError) {
      const response = new GetCommentResponse({
        error: {
          code: 'COCOGE0002',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    } else if (e instanceof RecordNotFoundError) {
      const response = new GetCommentResponse({
        error: {
          code: 'COCOGE0003',
          message:
            e.message !== null ? e.message : 'Target Comment Is Not Found',
        },
      })
      return sendResponse(res, 404, response)
    } else {
      const response = new GetCommentResponse({
        error: {
          code: 'COCOGE1004',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
// ______________________________________________________
//
// Define Controller Method For PUT /api/v1/comments/id
//
export const updateComment = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    await validateRequestParams(req, ['id'])
    await validateRequestBody(req, ['content'])
    const commentId = req.params.id
    const comment = await CommentDbDao.selectById(commentId)

    interface IsModifiedObj {
      [key: string]: boolean
    }
    const isModifiedObj: IsModifiedObj = {
      content: false,
    }
    if (comment.content !== req.body.content) {
      isModifiedObj.content = true
      comment.content = req.body.content
    }
    let isModified = false
    for (const isModifiedObjKey in isModifiedObj) {
      if (isModifiedObj[isModifiedObjKey]) {
        isModified = true
        break
      }
    }
    if (isModified) {
      comment.modDatetime = new Date().getTime()
      await CommentDbDao.update(comment)
      const response = new UpdateCommentResponse({
        data: comment,
      })
      return sendResponse(res, 200, response)
    }
    {
      const response = new UpdateCommentResponse({})
      return sendResponse(res, 304, response)
    }
  } catch (e) {
    if (e instanceof ParamsValidationError) {
      const response = new UpdateCommentResponse({
        error: {
          code: 'COCOPU0001',
          message:
            e.message !== null
              ? e.message
              : 'Some request parameter is invalid',
        },
      })
      return sendResponse(res, 404, response)
    }
    if (e instanceof DatabaseError) {
      const response = new UpdateCommentResponse({
        error: {
          code: 'COCOPU0002',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    } else if (e instanceof RecordNotFoundError) {
      const response = new UpdateCommentResponse({
        error: {
          code: 'COCOPU0003',
          message:
            e.message !== null ? e.message : 'Target Comment Is Not Found',
        },
      })
      return sendResponse(res, 404, response)
    } else {
      const response = new UpdateCommentResponse({
        error: {
          code: 'COCOPU0004',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
// ______________________________________________________
//
// Define Controller Method For DELETE /api/v1/commnets/id
//
export const deleteComment = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    await validateRequestParams(req, ['id'])
    const commentId = req.params.id
    const comment = await CommentDbDao.selectById(commentId)
    await CommentDbDao.delete(comment)
    const response = new DeleteCommentResponse({})
    return sendResponse(res, 204, response)
  } catch (e) {
    if (e instanceof ParamsValidationError) {
      const response = new DeleteCommentResponse({
        error: {
          code: 'COCODE0001',
          message:
            e.message !== null
              ? e.message
              : 'Some request parameter is invalid',
        },
      })
      return sendResponse(res, 404, response)
    }
    if (e instanceof DatabaseError) {
      const response = new DeleteCommentResponse({
        error: {
          code: 'COCODE0002',
          message:
            e.message !== null
              ? e.message
              : 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    } else if (e instanceof RecordNotFoundError) {
      const response = new DeleteCommentResponse({
        error: {
          code: 'COCODE0003',
          message:
            e.message !== null ? e.message : 'Target Comment Is Not Found',
        },
      })
      return sendResponse(res, 404, response)
    } else {
      const response = new DeleteCommentResponse({
        error: {
          code: 'COCODE0004',
          message: 'Some internal server error occurs',
        },
      })
      return sendResponse(res, 500, response)
    }
  }
}
