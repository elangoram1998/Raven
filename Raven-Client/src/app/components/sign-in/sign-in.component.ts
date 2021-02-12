import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { login } from 'src/app/auth/auth.actions';
import { AuthService } from 'src/app/auth/auth.service';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hidePassword: boolean = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  signInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  signInUser() {
    console.log(this.signInForm.value);
    this.authService.signIn(this.signInForm.value).pipe(
      tap((res: any) => {
        console.log(res);
        const user = res['user'];
        this.store.dispatch(login({ user }));
        this.router.navigate(['/home']);
      })
    ).subscribe(
      noop,
      () => {
        this.toastr.error('Username/Password is incorrect', 'Please enter a valid creadentials');
      }
    )
  }

  get Username() {
    return this.signInForm.get('username');
  }
  get Password() {
    return this.signInForm.get('password');
  }

}
