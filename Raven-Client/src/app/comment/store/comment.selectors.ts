import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState, selectAll } from '../reducers';

export const selectCommentState = createFeatureSelector<CommentState>('comment');

export const loadAllComments = createSelector(
    selectCommentState,
    selectAll
);