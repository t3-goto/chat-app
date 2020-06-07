import mongoose from 'mongoose'
import { DatabaseError } from './../errors/databaseError'
import { RecordNotFoundError } from './../errors/recordNotFoundError'
// ______________________________________________________
//
// Define User Document
//
export interface UserDoc extends mongoose.Document {
  email: string
  password: string
  firstName: string
  lastName: string
  provider: string
  loginDate: string
  reqDate: string
  modDate: string
}
// ______________________________________________________
//
// Define User Schema
//
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
  },
  loginDate: {
    type: String,
  },
  reqDate: {
    type: String,
    required: true,
  },
  modDate: {
    type: String,
    required: true,
  },
})
export const User = mongoose.model<UserDoc>('User', UserSchema)
// ______________________________________________________
//
// Define User Database Access Object
//
export class UserDbDao {
  // ______________________________________________________
  //
  // Method: Insert
  //
  public static insert(user: UserDoc): Promise<UserDoc> {
    return new Promise<UserDoc>((resolve, reject) => {
      user.save((err) => {
        if (err) {
          return reject(new DatabaseError('DBIN01: Some Database Error Occurs'))
        }
        return resolve(user)
      })
    })
  }
  // ______________________________________________________
  //
  // Method: Select All
  //
  public static selectAll(): Promise<UserDoc[]> {
    return new Promise<UserDoc[]>((resovle, reject) => {
      try {
        User.find().then((users) => {
          return resovle(users)
        })
      } catch {
        return reject(new DatabaseError('DBSA01: Some Database Error Occurs'))
      }
    })
  }
  // ______________________________________________________
  //
  // Method: Select By Id
  //
  public static selectById(userId: string): Promise<UserDoc> {
    return new Promise<UserDoc>((resovle, reject) => {
      try {
        User.findById(userId, (err, user) => {
          if (err) {
            return reject(
              new RecordNotFoundError('DBSB01: Target User Is Not Found')
            )
          }
          if (!user) {
            return reject(
              new RecordNotFoundError('DBSB02: Target User Is Not Found')
            )
          }
          return resovle(user)
        })
      } catch {
        return reject(new DatabaseError('DBSB03: Some Database Error Occurs'))
      }
    })
  }
  // ______________________________________________________
  //
  // Method: Select By Email
  //
  public static selectByEmail(email: string): Promise<UserDoc> {
    return new Promise<UserDoc>((resovle, reject) => {
      try {
        User.findOne({ email }, (err, user) => {
          if (err) {
            return reject(
              new RecordNotFoundError('DBSE01: Target User Is Not Found')
            )
          }
          if (!user) {
            return reject(
              new RecordNotFoundError('DBSE02: Target User Is Not Found')
            )
          }
          return resovle(user)
        })
      } catch {
        return reject(new DatabaseError('DBSE03: Some Database Error Occurs'))
      }
    })
  }
  // ______________________________________________________
  //
  // Method: Update
  //
  public static update(user: UserDoc): Promise<UserDoc> {
    return new Promise<UserDoc>((resolve, reject) => {
      user.save((err) => {
        if (err) {
          return reject(new DatabaseError('DBUP01: Some Database Error Occurs'))
        }
        return resolve(user)
      })
    })
  }
  // ______________________________________________________
  //
  // Method: Delete
  //
  public static delete(user: UserDoc): Promise<UserDoc> {
    return new Promise<UserDoc>((resolve, reject) => {
      user.remove((err) => {
        if (err) {
          return reject(new DatabaseError('DBDE01: Some Database Error Occurs'))
        }
        return resolve(user)
      })
    })
  }
}
