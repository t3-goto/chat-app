import { Component, OnInit } from '@angular/core';

// Form
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

// HttpClient
import { HttpClientService } from './../../core/service/http-client.service';
import { RestInDto } from './../../model/rest-in-dto';
import { RestOutDto } from './../../model/rest-out-dto';
import { HttpResponse } from '@angular/common/http';

// Config
import config from './../../../assets/config/config';

// Session
import { SessionService } from 'src/app/core/service/session.service';

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _loginForm: FormGroup;

  public message: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClientService: HttpClientService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // onClick login
  loginByEmail(): void {
    const url = config.apiUrlLogin;
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      provider: 'email',
    };
    const restInDto: RestInDto = new RestInDto(url, body);
    this.httpClientService
      .post(restInDto)
      .subscribe((httpResponse: HttpResponse<RestOutDto>) => {
        this.sessionService.setSession(httpResponse.body.data.token);
        this.router.navigate(['/chat']);
      });
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
