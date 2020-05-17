import { Injectable } from '@angular/core';

// Model
import { Session } from './../../model/session';

// RxJS
import { Observable, Subject } from 'rxjs';

// JWT
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor() {}

  setSession(token: string): void {
    this.session.token = token;
    this.session.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('app-auth', token);
    localStorage.setItem('app-meta', JSON.stringify(this.session.decodedToken));
    this.sessionSubject.next(this.session);
  }

  resetSession(): void {
    localStorage.removeItem('app-auth');
    localStorage.removeItem('app-meta');
    this.sessionSubject.next(this.session.reset());
  }

  getSesion(): Session {
    this.session.token = localStorage.getItem('app-auth');
    this.session.decodedToken = JSON.parse(localStorage.getItem('app-meta'));
    return this.session;
  }
}
