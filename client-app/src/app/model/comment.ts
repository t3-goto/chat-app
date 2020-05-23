import { User } from './user';
export class Comment {
  user: User;
  content: string;
  regDatetime: number;
  modDatetime: number;
  commentId?: string;
  editFlag?: boolean;
  constructor(user: User, content: string) {
    this.user = user;
    this.content = content;
    const now = new Date().getTime();
    this.regDatetime = now;
    this.modDatetime = now;
  }

  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }

  setData(
    regDatetime: number,
    modDatetime: number,
    commnetId: string
  ): Comment {
    this.regDatetime = regDatetime;
    this.modDatetime = modDatetime;
    this.commentId = commnetId;
    this.editFlag = false;
    return this;
  }
}
