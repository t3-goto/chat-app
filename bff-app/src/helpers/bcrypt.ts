// ______________________________________________________
//
// Use Encrypt Library 'bcrypt'.
// For more details:
// https://github.com/kelektiv/node.bcrypt.js/ and https://www.npmjs.com/package/bcrypt
//
import bcrypt from 'bcrypt'
import { SystemError } from './../errors/systemError'
// ______________________________________________________
//
// Method: Compare Pain Text With Hash Text
//
export const comparePlainWithHash = (
  plainText: string,
  encryptedText: string
): boolean => {
  try {
    return bcrypt.compareSync(plainText, encryptedText)
  } catch (e) {
    throw new SystemError()
  }
}
// ______________________________________________________
//
// Method: Generate Hash Text From Plain Text
//
export const genHash = (plainText: string, saltRounds: number = 10): string => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(plainText, salt)
  } catch (e) {
    throw new SystemError()
  }
}
