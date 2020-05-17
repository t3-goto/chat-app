import { Component, OnInit } from '@angular/core';

import { HttpClientService } from './../core/service/http-client.service';
import { RestInDto } from './../model/rest-in-dto';
import { RestOutDto } from './../model/rest-out-dto';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  private restInDto1: RestInDto;
  private restInDto2: RestInDto;
  private restInDto3: RestInDto;
  public message1: string;
  public message2: string;
  public message3: string;
  private loginBody: any;
  private token: string;
  public message4: string;
  private _loginForm: FormGroup;
  constructor(
    private httpClientService: HttpClientService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.restInDto1 = new RestInDto('/api/v1/users');
    this.httpClientService
      .get(this.restInDto1)
      .subscribe((httpResponse: HttpResponse<RestOutDto>) => {
        this.message1 = JSON.stringify(httpResponse.body);
      });
    this.loginBody = {
      email: 'teruki.gotoh@gmail.com',
      password: 'testtest',
      provider: 'email',
    };

    this.restInDto2 = new RestInDto('/api/v1/login', this.loginBody);
    this.httpClientService
      .post(this.restInDto2)
      .subscribe((httpResponse: HttpResponse<RestOutDto>) => {
        this.message2 = JSON.stringify(httpResponse.body);
        this.token = 'Bearer ' + httpResponse.body.data.token;
        this.token = 'Bearer ' + httpResponse.body.data.token;
        this.restInDto3 = new RestInDto('/api/v1/comments', this.token);
        this.httpClientService
          .get(this.restInDto3)
          .subscribe((httpResponse: HttpResponse<RestOutDto>) => {
            this.message3 = JSON.stringify(httpResponse.body);
          });
      });

    this.loginForm = this.formBuilder.group({
      email: ['ddd'],
      password: ['aaa'],
    });
  }

  display() {
    this.message4 = JSON.stringify(this.loginForm.value);
  }

  // Accessers
  get loginForm(): FormGroup {
    return this._loginForm;
  }
  set loginForm(val: FormGroup) {
    this._loginForm = val;
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
