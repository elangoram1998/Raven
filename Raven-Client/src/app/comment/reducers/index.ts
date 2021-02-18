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
import { CommentSet } from 'src/app/model/comment-set';
import { environment } from '../../../environments/environment';
import { loadComments } from '../store/comment.actions';

export const commentFeatureKey = 'comment';

export interface CommentState extends EntityState<CommentSet> {

}

export const adapter = createEntityAdapter<CommentSet>({
  selectId: (comment: CommentSet) => comment._id
});

export const intialState = adapter.getInitialState();

export const commentReducer = createReducer(
  intialState,
  on(loadComments, (state, action) => adapter.addMany(action.comments, state))
)

export const { selectAll } = adapter.getSelectors();

export const metaReducers: MetaReducer<CommentState>[] = !environment.production ? [] : [];
