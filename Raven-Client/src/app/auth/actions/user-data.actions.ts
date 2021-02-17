import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { UserData } from '../../model/user-data';

export const loadUserData = createAction(
  '[UserData] Load UserDatas',
  props<{ userData: UserData }>()
);

export const updateUserData = createAction(
  '[Start Follow] Pushin Followings',
  props<{ userData: UserData }>()
);

export const updateMyUserData = createAction(
  '[Update UserData] Update',
  props<{ userData: UserData }>()
)





