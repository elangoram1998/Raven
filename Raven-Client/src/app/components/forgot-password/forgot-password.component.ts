import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  isReceivedCode: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  form = this.fb.group({
    username: ['', Validators.required],
  });

  codeForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]]
  });

  sendCode() {
    console.log(this.form.value);
    this.authService.sendCode(this.username?.value).subscribe(
      () => {
        this.isReceivedCode = true;
      },
      error => {
        console.log(error)
        this.toastr.error('Unable to send code', error.error);
      }
    )
  }

  validateCode() {
    console.log(this.code?.value);
    this.authService.validateCode(this.username?.value, this.code?.value).subscribe(
      () => {
        this.router.navigate(['/resetPassword']);
      },
      error => {
        console.log(error);
        this.toastr.error('Unable to verify code', error.error);
      }
    )
  }

  get username() {
    return this.form.get('username');
  }
  get code() {
    return this.codeForm.get('code');
  }
}
