import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hidePassword: boolean = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  signUpForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]]
  });

  signUpUser() {
    console.log(this.signUpForm.value);
    this.authService.signUp(this.signUpForm.value).subscribe(
      success => {
        this.toastr.success('Account created', 'Please sign in to the application');
        this.router.navigate(['/signIn']);
      },
      error => {
        console.log(error);
        this.toastr.error('SignUp Error', 'Unable to create a new account');
      }
    )
  }

  get Username() {
    return this.signUpForm.get('username');
  }
  get Email() {
    return this.signUpForm.get('email');
  }
  get Password() {
    return this.signUpForm.get('password');
  }

}
