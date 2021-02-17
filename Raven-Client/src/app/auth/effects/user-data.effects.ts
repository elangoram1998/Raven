import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { loadUserData, updateMyUserData, updateUserData } from '../actions/user-data.actions';
import { AuthService } from '../auth.service';



@Injectable()
export class UserDataEffects {

  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserData),
      tap(action => {
        localStorage.setItem('userData', JSON.stringify(action.userData));
      })
    ),
    { dispatch: false }
  )

  updatedUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserData),
      tap(action => {
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(action.userData));
      })
    ),
    { dispatch: false }
  );

  updateMyUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMyUserData),
      tap(action => {
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(action.userData));
      }),
      concatMap(action => this.userService.updateUserData(action.userData))
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private userService: UserService) { }

}
