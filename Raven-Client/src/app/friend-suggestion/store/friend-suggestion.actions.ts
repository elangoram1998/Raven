import { createAction, props } from '@ngrx/store';
import { FriendSuggestion } from 'src/app/model/friend-suggestion';

export const loadFriendSuggestions = createAction(
  '[FriendSuggestion] Load FriendSuggestions'
);

export const allSuggestionsLoaded = createAction(
  '[Load FS Effect] All Suggestions Loaded',
  props<{ suggestions: FriendSuggestion[] }>()
);




