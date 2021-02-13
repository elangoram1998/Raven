import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/model/user';

export const selectAuthState = createFeatureSelector<User>('auth');

export const isLoggedIn = createSelector(
    selectAuthState,
    (user) => !!user.username
)