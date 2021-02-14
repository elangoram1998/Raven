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
import { FriendSuggestion } from 'src/app/model/friend-suggestion';
import { environment } from '../../../environments/environment';
import { allSuggestionsLoaded } from '../store/friend-suggestion.actions';

export const friendSuggestionFeatureKey = 'friendSuggestion';

export interface FState extends EntityState<FriendSuggestion> {
  allSuggestionsLoaded: boolean
}

export const adapter = createEntityAdapter<FriendSuggestion>({
  selectId: (fs: FriendSuggestion) => fs._id
});

export const initialState = adapter.getInitialState({
  allSuggestionsLoaded: false
})

export const friendSuggestionReducer = createReducer(
  initialState,
  on(allSuggestionsLoaded, (state, action) => adapter.addMany(action.suggestions, { ...state, allSuggestionsLoaded: true }))
)


export const metaReducers: MetaReducer<FState>[] = !environment.production ? [] : [];
