import { Injectable } from '@angular/core';

// HttpClient
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

// Model
import { RestOutDto } from './../../model/rest-out-dto';
import { RestInDto } from './../../model/rest-in-dto';

// RxJS
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  // GET
  public get(restInDto: RestInDto): Observable<HttpResponse<RestOutDto>> {
    return this.httpClient
      .get<RestOutDto>(restInDto.url, {
        observe: 'response',
        headers: restInDto.header,
      })
      .pipe(retry(3), catchError(this.handleError));
  }

  // POST
  public post(restInDto: RestInDto): Observable<HttpResponse<RestOutDto>> {
    return this.httpClient
      .post<RestOutDto>(restInDto.url, restInDto.body, {
        observe: 'response',
        headers: restInDto.header,
      })
      .pipe(catchError(this.handleError));
  }

  // PUT
  public put(restInDto: RestInDto): Observable<HttpResponse<RestOutDto>> {
    return this.httpClient
      .put<RestOutDto>(restInDto.url, restInDto.body, {
        observe: 'response',
        headers: restInDto.header,
      })
      .pipe(catchError(this.handleError));
  }

  // DELETE
  public delete(restInDto: RestInDto): Observable<HttpResponse<RestOutDto>> {
    return this.httpClient
      .delete<RestOutDto>(restInDto.url, {
        observe: 'response',
        headers: restInDto.header,
      })
      .pipe(catchError(this.handleError));
  }

  // Error Handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status},` + `body was:  ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
