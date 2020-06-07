// ______________________________________________________
//
// Defines All Of The JWT Config Parameters
//
export const jwtConfigParam = {
  algorithm: 'HS256',
  expiresIn: 60 * 60 * 24,
} as const
// ______________________________________________________
//
// Defines All Of The JWT Payload Schema
//
export interface Payload {
  userId: string
}
