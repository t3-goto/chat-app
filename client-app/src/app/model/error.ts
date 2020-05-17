export class Error {
  code: string;
  message: string;
  info: string;

  constructor(code?: string, message?: string, info?: string) {
    this.code = code ? code : null;
    this.message = message ? message : null;
    this.info = info ? info : null;
  }
}
