import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserData } from 'src/app/model/user-data';
import { UserDataState } from '../reducers/userdata.reducer';

export const selectMyUserData = createFeatureSelector<UserDataState>('userData');

export const selectUserData = createSelector(
    selectMyUserData,
    data => data.userData
)

export const selectMyLikedPosts = createSelector(
    selectUserData,
    (data) => data.liked_post
)

export const selectMySavedPosts = createSelector(
    selectUserData,
    (data) => data.saved_post
)

export const selectMyLikedComments = createSelector(
    selectUserData,
    (data) => data.liked_comments
)