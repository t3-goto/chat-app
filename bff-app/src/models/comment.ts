import mongoose from 'mongoose'
import { DatabaseError } from './../errors/databaseError'
import { RecordNotFoundError } from './../errors/recordNotFoundError'
// ______________________________________________________
//
// Define Comment Document
//
export interface CommentDoc extends mongoose.Document {
  content: string
  regDatetime: number
  modDatetime: number
  user: {
    fullName: string
    initial: string
    commentId: string
  }
}
// ______________________________________________________
//
// Define Comment Schema
//
const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  regDatetime: {
    type: Number,
    required: true,
  },
  modDatetime: {
    type: Number,
    required: true,
  },
  user: {
    fullName: { type: String, required: true },
    initial: { type: String, required: true },
    userId: { type: String, required: true },
  },
})
export const Comment = mongoose.model<CommentDoc>('Comment', CommentSchema)
// ______________________________________________________
//
// Define Comment Database Access Object
//
export class CommentDbDao {
  // ______________________________________________________
  //
  // Method: Insert
  //
  public static insert(comment: CommentDoc): Promise<CommentDoc> {
    return new Promise<CommentDoc>((resolve, reject) => {
      comment.save((err) => {
        if (err) {
          return reject(new DatabaseError('DBIN01: Some Database Error Occurs'))
        }
        return resolve(comment)
      })
    })
  }
  // ______________________________________________________
  //
  // Method: Select All
  //
  public static selectAll(): Promise<CommentDoc[]> {
    return new Promise<CommentDoc[]>((resovle, reject) => {
      try {
        Comment.find().then((comments) => {
          return resovle(comments)
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
  public static selectById(commentId: string): Promise<CommentDoc> {
    return new Promise<CommentDoc>((resovle, reject) => {
      try {
        Comment.findById(commentId, (err, comment) => {
          if (err) {
            return reject(
              new RecordNotFoundError('DBSB01: Target Comment Is Not Found')
            )
          }
          if (!comment) {
            return reject(
              new RecordNotFoundError('DBSB02: Target Comment Is Not Found')
            )
          }
          return resovle(comment)
        })
      } catch {
        return reject(new DatabaseError('DBSB03: Some Database Error Occurs'))
      }
    })
  }
  // ______________________________________________________
  //
  // Method: Update
  //
  public static update(comment: CommentDoc): Promise<CommentDoc> {
    return new Promise<CommentDoc>((resolve, reject) => {
      comment.save((err) => {
        if (err) {
          return reject(new DatabaseError('DBUP01: Some Database Error Occurs'))
        }
        return resolve(comment)
      })
    })
  }
  // ______________________________________________________
  //
  // Method: Delete
  //
  public static delete(comment: CommentDoc): Promise<CommentDoc> {
    return new Promise<CommentDoc>((resolve, reject) => {
      comment.remove((err) => {
        if (err) {
          return reject(new DatabaseError('DBDE01: Some Database Error Occurs'))
        }
        return resolve(comment)
      })
    })
  }
}
