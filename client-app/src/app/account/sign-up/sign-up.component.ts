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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  private _signUpForm: FormGroup;
  private _message: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClientService: HttpClientService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    });
  }

  // validation
  private validateForm(): string {
    if (
      this.signUpForm.value.password !== this.signUpForm.value.passwordConfirm
    ) {
      return 'VAL001' + ' : ' + 'Invalid password';
    }
  }

  // onClick Sign Up
  signUpByEmail(): void {
    // validation
    this.message = this.validateForm();
    if (this.message) {
      return;
    }
    const url = config.apiUrlUsers;
    const body = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      provider: 'email',
    };
    const restInDto: RestInDto = new RestInDto(url, body);
    this.httpClientService
      .post(restInDto)
      .subscribe((httpResponse: HttpResponse<RestOutDto>) => {
        // this.message = httpResponse.headers.get('location');
        this.router.navigate(['/account/login']);
      });
  }

  // Accessers
  get signUpForm(): FormGroup {
    return this._signUpForm;
  }
  set signUpForm(val: FormGroup) {
    this._signUpForm = val;
  }

  get email(): AbstractControl {
    return this.signUpForm.get('email');
  }
  get password(): AbstractControl {
    return this.signUpForm.get('password');
  }
  get passwordConfirm(): AbstractControl {
    return this.signUpForm.get('passwordConfirm');
  }

  get message(): string {
    return this._message;
  }
  set message(val: string) {
    this._message = val;
  }
}
