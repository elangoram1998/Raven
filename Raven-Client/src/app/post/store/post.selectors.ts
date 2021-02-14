import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from '../reducers';

export const selectPostState = createFeatureSelector<PostState>("post");

export const arePostLoaded = createSelector(
    selectPostState,
    state => state.arePostLoaded
)