import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { login, logout } from '../actions/auth.actions';
import { AuthService } from '../auth.service';



@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      tap(action => {
        localStorage.setItem('user', JSON.stringify(action.user));
      })
    ),
    { dispatch: false }
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(action => {
        this.router.navigateByUrl('/SignIn');
        this.authService.signOut().subscribe(
          noop,
          error => {
            console.log(error);
          }
        )
        localStorage.clear();
      })
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions,
    private authService: AuthService,
    private router: Router) { }

}
