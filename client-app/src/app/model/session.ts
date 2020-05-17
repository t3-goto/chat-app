import { DecodedToken } from './decoded-token';
export class Session {
  token: string;
  decodedToken: DecodedToken;

  constructor() {
    this.token = null;
    this.decodedToken = null;
  }

  reset(): Session {
    this.token = null;
    this.decodedToken = null;
    return this;
  }
}
