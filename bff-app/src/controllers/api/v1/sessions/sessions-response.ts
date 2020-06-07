import { Response, ResponseProps } from './../../../../helpers/response'
// ______________________________________________________
//
// Define Response Schema For POST /api/v1/sessions
//
type Token = {
  token: string
}
interface CreateSessionResponseProps extends ResponseProps {
  data?: Token | string
}
export class CreateSessionResponse<
  T extends CreateSessionResponseProps
> extends Response<ResponseProps> {
  data?: T['data']
  constructor(props: T) {
    super(props)
    this.data = props.data === undefined ? '' : props.data
  }
}
