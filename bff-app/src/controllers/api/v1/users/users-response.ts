import { Response, ResponseProps } from './../../../../helpers/response'
import { UserDoc } from './../../../../models/user'
// ______________________________________________________
//
// Define Response Schema For POST /api/v1/users
//
interface AddUserResponseProps extends ResponseProps {
  data?: UserDoc | string
}
export class AddUserResponse<T extends AddUserResponseProps> extends Response<
  ResponseProps
> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
// ______________________________________________________
//
// Define Response Schema For GET /api/v1/users
//
interface GetUsersResponseProps extends ResponseProps {
  data?: UserDoc[] | string
}
export class GetUsersResponse<T extends GetUsersResponseProps> extends Response<
  ResponseProps
> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
// ______________________________________________________
//
// Define Response Schema For GET /api/v1/users/id
//
interface GetUserResponseProps extends ResponseProps {
  data?: UserDoc | string
}
export class GetUserResponse<T extends GetUserResponseProps> extends Response<
  ResponseProps
> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
// ______________________________________________________
//
// Define Response Schema For PUT /api/v1/users/id
//
interface UpdateUserResponseProps extends ResponseProps {
  data?: UserDoc | string
}
export class UpdateUserResponse<
  T extends UpdateUserResponseProps
> extends Response<ResponseProps> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
// ______________________________________________________
//
// Define Response Schema For DELETE /api/v1/users/id
//
interface DeleteUserResponseProps extends ResponseProps {
  data?: UserDoc | string
}
export class DeleteUserResponse<
  T extends DeleteUserResponseProps
> extends Response<ResponseProps> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
