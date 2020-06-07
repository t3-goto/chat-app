import { Response, ResponseProps } from './../../../../helpers/response'
import { CommentDoc } from './../../../../models/comment'
// ______________________________________________________
//
// Define Response Schema For POST /api/v1/comments
//
interface AddCommentResponseProps extends ResponseProps {
  data?: CommentDoc | string
}
export class AddCommentResponse<
  T extends AddCommentResponseProps
> extends Response<ResponseProps> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
// ______________________________________________________
//
// Define Response Schema For GET /api/v1/comments
//
interface GetCommentsResponseProps extends ResponseProps {
  data?: CommentDoc[] | string
}
export class GetCommentsResponse<
  T extends GetCommentsResponseProps
> extends Response<ResponseProps> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
// ______________________________________________________
//
// Define Response Schema For GET /api/v1/comments/id
//
interface GetCommentResponseProps extends ResponseProps {
  data?: CommentDoc | string
}
export class GetCommentResponse<
  T extends GetCommentResponseProps
> extends Response<ResponseProps> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
// ______________________________________________________
//
// Define Response Schema For PUT /api/v1/comments/id
//
interface UpdateCommentResponseProps extends ResponseProps {
  data?: CommentDoc | string
}
export class UpdateCommentResponse<
  T extends UpdateCommentResponseProps
> extends Response<ResponseProps> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
// ______________________________________________________
//
// Define Response Schema For DELETE /api/v1/commnets/id
//
interface DeleteCommentResponseProps extends ResponseProps {
  data?: CommentDoc | string
}
export class DeleteCommentResponse<
  T extends DeleteCommentResponseProps
> extends Response<ResponseProps> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
