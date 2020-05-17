import { HttpHeaders } from '@angular/common/http';

export class RestInDto {
  url: string;
  header: HttpHeaders;
  body: any;

  constructor(url?: string, body?: any) {
    this.url = url ? url : null;
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.body = body ? body : null;
  }
}
