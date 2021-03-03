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
import { Post } from 'src/app/model/post';
import { environment } from '../../../environments/environment';
import { addNewPost, allPostLoaded, deletePost, postUpdated, updateClientPost } from '../store/post.actions';

export const postFeatureKey = 'post';

export interface PostState extends EntityState<Post> {
  arePostLoaded: boolean
}

export const adapter = createEntityAdapter<Post>({
  selectId: (post: Post) => post._id
});

export const initialState = adapter.getInitialState({
  arePostLoaded: false
});

export const postReducer = createReducer(
  initialState,
  on(allPostLoaded, (state, action) => adapter.addMany(action.posts, { ...state, arePostLoaded: true })),
  on(logout, (state, action) => adapter.removeAll({ ...state, arePostLoaded: false })),
  on(addNewPost, (state, action) => adapter.addOne(action.post, state)),
  on(postUpdated, (state, action) => adapter.updateOne(action.update, state)),
  on(updateClientPost, (state, action) => adapter.updateOne(action.update, state)),
  on(deletePost, (state, action) => adapter.removeOne(action.id, state))
)

export const { selectAll } = adapter.getSelectors();

export const metaReducers: MetaReducer<PostState>[] = !environment.production ? [] : [];
