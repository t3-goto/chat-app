import cookieParser from 'cookie-parser'
import Express from 'express'
// ______________________________________________________
//
// Set Request Parsers
//
const setParsers = (app: Express.Application) => {
  app.use(Express.urlencoded({ extended: true }))
  app.use(Express.json())
  app.use(cookieParser())
}
// ______________________________________________________
//
// Defines All Of The Application Request Middlewares
//
export const setRequestMiddlewares = (app: Express.Application) => {
  setParsers(app)
}
