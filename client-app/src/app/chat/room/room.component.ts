import { Component, OnInit } from '@angular/core';

// Model
import { User } from './../../model/user';
import { Comment } from './../../model/comment';
import { Session } from './../../model/session';

// RxJS
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// SessionService
import { SessionService } from './../../core/service/session.service';

// Config
import config from './../../../assets/config/config';

// HttpClient
import { HttpClientService } from './../../core/service/http-client.service';
import { RestInDto } from './../../model/rest-in-dto';
import { RestOutDto } from './../../model/rest-out-dto';
import { HttpResponse } from '@angular/common/http';

// Form
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  public currentUser: User;
  public comments: Comment[];
  private _commentForm: FormGroup;
  public editedComment: Comment;
  public editStatus = false;

  constructor(
    private sessionService: SessionService,
    private httpClientService: HttpClientService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    const session = this.sessionService.getSesion();
    this.currentUser = new User(
      session.decodedToken.userId,
      session.decodedToken.firstName,
      session.decodedToken.lastName
    );
    this.initChatList();
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

  initChatList(): void {
    const url = config.apiUrlComments;
    const body = {};
    const restInDto: RestInDto = new RestInDto(url, body);
    this.httpClientService
      .get(restInDto)
      .subscribe((httpResponse: HttpResponse<RestOutDto>) => {
        this.comments = new Array<Comment>();
        for (const bodyData of httpResponse.body.data) {
          const userId = bodyData.user.userId;
          const fullName = bodyData.user.fullName;
          const initial = bodyData.user.initial;
          const user = new User(userId, null, null, fullName, initial);
          const content = bodyData.content;
          const comment = new Comment(user, content);
          const commentId = bodyData._id;
          const regDatetime = bodyData.regDatetime;
          const modDatetime = bodyData.modDatetime;
          comment.setData(regDatetime, modDatetime, commentId);
          this.comments.push(comment);
        }
      });
  }
  addComment(event): void {
    event.preventDefault();
    const url = config.apiUrlComments;
    const body = {
      content: this.commentForm.value.content,
      user: {
        _id: this.currentUser.id,
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
      },
    };
    const restInDto: RestInDto = new RestInDto(url, body);
    this.httpClientService
      .post(restInDto)
      .subscribe((httpResponse: HttpResponse<RestOutDto>) => {
        const bodyData = httpResponse.body.data;
        const userId = bodyData.user.userId;
        const fullName = bodyData.user.fullName;
        const initial = bodyData.user.initial;
        const user = new User(userId, null, null, fullName, initial);
        const content = bodyData.content;
        const comment = new Comment(user, content);
        const commentId = bodyData._id;
        const regDatetime = bodyData.regDatetime;
        const modDatetime = bodyData.modDatetime;
        comment.setData(regDatetime, modDatetime, commentId);
        this.comments.push(comment);
      });
  }

  toggleEditComment(comment: Comment): void {
    if (this.editStatus === false || comment.editFlag === true) {
      comment.editFlag = !comment.editFlag;
      const userId = comment.user.id;
      const fullName = comment.user.fullName;
      const initial = comment.user.initial;
      const user = new User(userId, null, null, fullName, initial);
      const content = comment.content;
      this.editedComment = new Comment(user, content);
      const commentId = comment.commentId;
      const regDatetime = comment.regDatetime;
      const modDatetime = comment.modDatetime;
      this.editedComment.setData(regDatetime, modDatetime, commentId);
      this.editStatus = !this.editStatus;
    }
  }

  private validateEditedComment(comment) {
    return comment.content === this.editedComment.content;
  }

  saveEditComment(i: number, comment: Comment): void {
    // validation
    if (this.validateEditedComment(comment)) {
      return;
    }
    const url = config.apiUrlComments + '/' + this.editedComment.commentId;
    const body = {
      content: this.editedComment.content,
    };
    const restInDto: RestInDto = new RestInDto(url, body);
    this.httpClientService
      .put(restInDto)
      .subscribe((httpResponse: HttpResponse<RestOutDto>) => {
        const bodyData = httpResponse.body.data;
        this.comments[i].content = bodyData.content;
        this.comments[i].modDatetime = bodyData.modDatetime;
        this.comments[i].editFlag = !this.comments[i].editFlag;
        this.editStatus = false;
      });
  }
  resetEditComment(comment: Comment): void {
    this.editedComment.content = comment.content;
  }

  deleteComment(i: number, comment: Comment): void {
    const url = config.apiUrlComments + '/' + comment.commentId;
    const body = {};
    const restInDto: RestInDto = new RestInDto(url, body);
    this.httpClientService
      .delete(restInDto)
      .subscribe((httpResponse: HttpResponse<RestOutDto>) => {
        this.comments.splice(i, 1);
      });
  }

  // Accessers
  get commentForm(): FormGroup {
    return this._commentForm;
  }
  set commentForm(val: FormGroup) {
    this._commentForm = val;
  }

  get content(): AbstractControl {
    return this.commentForm.get('content');
  }
}
