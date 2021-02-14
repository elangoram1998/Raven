import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/user.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
    selectAuthState,
    (auth) => !!auth.user?._id
);

export const selectUser = createSelector(
    selectAuthState,
    (auth) => auth.user
)

export const selectAvatar = createSelector(
    selectUser,
    (user) => user?.avatar
);