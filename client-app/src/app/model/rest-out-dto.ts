import { Error } from './error';

export class RestOutDto {
  data: any;
  error: Error;
  constructor(data?: any, error?: Error) {
    this.data = data ? data : null;
    this.error = error ? error : null;
  }
}
