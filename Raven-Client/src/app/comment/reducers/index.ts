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
import { insertComment, loadComments, updateComment } from '../store/comment.actions';

export const commentFeatureKey = 'comment';

export interface CommentState extends EntityState<CommentSet> {

}

export const adapter = createEntityAdapter<CommentSet>({
  selectId: (comment: CommentSet) => comment._id
});

export const intialState = adapter.getInitialState();

export const commentReducer = createReducer(
  intialState,
  on(loadComments, (state, action) => adapter.addMany(action.comments, state)),
  on(insertComment, (state, action) => adapter.addOne(action.commentSet, state)),
  on(updateComment, (state, action) => adapter.updateOne(action.update, state))
)

export const { selectAll } = adapter.getSelectors();

export const metaReducers: MetaReducer<CommentState>[] = !environment.production ? [] : [];
