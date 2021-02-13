import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserData } from 'src/app/model/user-data';

export const selectUserData=createFeatureSelector<UserData>('userData');