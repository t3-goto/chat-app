import Express from 'express'
import * as comments from './../controllers/api/v1/comments/comments-controller'
import * as sessions from './../controllers/api/v1/sessions/sessions-controller'
import * as users from './../controllers/api/v1/users/users-controller'
import { setAuthMiddleware } from './../middlewares/auth-middleware'
// ______________________________________________________
//
// Defines All Of The Application Path
//
export const path = {
  v1: {
    users: '/api/v1/users',
    usersId: '/api/v1/users/:id',
    sessions: '/api/v1/sessions',
    comments: '/api/v1/comments',
    commentsId: '/api/v1/comments/:id',
  },
} as const
// ______________________________________________________
//
// Defines All Of The Users Routes
//
const setUsersRoutes = (app: Express.Application) => {
  // ______________________________________________________
  //
  // POST /api/v1/users
  //
  app.post(path.v1.users, users.addUser)
  // ______________________________________________________
  //
  // GET /api/v1/users
  //
  app.get(path.v1.users, setAuthMiddleware, users.getUsers)
  // ______________________________________________________
  //
  // GET /api/v1/users/id
  //
  app.get(path.v1.usersId, setAuthMiddleware, users.getUser)
  // ______________________________________________________
  //
  // PUT /api/v1/users/id
  //
  app.put(path.v1.usersId, setAuthMiddleware, users.updateUser)
  // ______________________________________________________
  //
  // DELETE /api/v1/users/id
  //
  app.delete(path.v1.usersId, setAuthMiddleware, users.deleteUser)
}
// ______________________________________________________
//
// Defines All Of The Sessions Routes
//
const setSessionsRoutes = (app: Express.Application) => {
  // ______________________________________________________
  //
  // POST /api/v1/sessions
  //
  app.post(path.v1.sessions, sessions.createSession)
}
// ______________________________________________________
//
// Defines All Of The Comments Routes
//
const setCommentsRoutes = (app: Express.Application) => {
  // ______________________________________________________
  //
  // POST /api/v1/comments
  //
  app.post(path.v1.comments, setAuthMiddleware, comments.addComment)
  // ______________________________________________________
  //
  // GET /api/v1/comments
  //
  app.get(path.v1.comments, setAuthMiddleware, comments.getComments)
  // ______________________________________________________
  //
  // GET /api/v1/comments/id
  //
  app.get(path.v1.commentsId, setAuthMiddleware, comments.getComment)
  // ______________________________________________________
  //
  // PUT /api/v1/comments/id
  //
  app.put(path.v1.commentsId, setAuthMiddleware, comments.updateComment)
  // ______________________________________________________
  //
  // DELETE /api/v1/commnets/id
  //
  app.delete(path.v1.commentsId, setAuthMiddleware, comments.deleteComment)
}
// ______________________________________________________
//
// Defines All Of The Application Routes
//
export const setRoutes = (app: Express.Application) => {
  // ______________________________________________________
  //
  // Set Users Routes
  //
  setUsersRoutes(app)
  // ______________________________________________________
  //
  // Set Sessions Routes
  //
  setSessionsRoutes(app)
  // ______________________________________________________
  //
  // Set Comments Routes
  //
  setCommentsRoutes(app)
}
