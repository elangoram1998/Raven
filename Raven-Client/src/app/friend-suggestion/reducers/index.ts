import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { logout } from 'src/app/auth/actions/auth.actions';
import { FriendSuggestion } from 'src/app/model/friend-suggestion';
import { environment } from '../../../environments/environment';
import { allSuggestionsLoaded } from '../store/friend-suggestion.actions';

export const friendSuggestionFeatureKey = 'friendSuggestion';

export interface FState extends EntityState<FriendSuggestion> {
  allFriendSuggestionsLoaded: boolean
}

export const adapter = createEntityAdapter<FriendSuggestion>({
  selectId: (fs: FriendSuggestion) => fs._id
});

export const initialState = adapter.getInitialState({
  allFriendSuggestionsLoaded: false
})

export const friendSuggestionReducer = createReducer(
  initialState,
  on(allSuggestionsLoaded, (state, action) => adapter.addMany(action.suggestions, { ...state, allFriendSuggestionsLoaded: true })),
  on(logout, (state, action) => adapter.removeAll({ ...state, allFriendSuggestionsLoaded: false }))
)


export const metaReducers: MetaReducer<FState>[] = !environment.production ? [] : [];
