import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FState, selectAll } from '../reducers';

export const selectFSstate = createFeatureSelector<FState>("friendSuggestion");

export const areFSLoaded = createSelector(
    selectFSstate,
    state => state.allFriendSuggestionsLoaded
)

export const selectAllFS = createSelector(
    selectFSstate,
    selectAll
)