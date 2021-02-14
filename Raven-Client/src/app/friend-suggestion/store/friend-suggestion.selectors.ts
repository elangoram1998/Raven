import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FState } from '../reducers';

export const selectFSstate = createFeatureSelector<FState>("friendSuggestion");

export const areFSLoaded = createSelector(
    selectFSstate,
    state => state.allFriendSuggestionsLoaded
)