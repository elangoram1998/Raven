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
import { allMyPostLoaded, myPostUpdated, updateMyClientPost } from '../store/my-post.actions';

export const myPostFeatureKey = 'myPost';

export interface MyPostState extends EntityState<Post> {
  areMyPostsLoaded: boolean;
}

export const adapter = createEntityAdapter<Post>({
  selectId: (post: Post) => post._id
});

export const initialState = adapter.getInitialState({
  areMyPostsLoaded: false
});


export const myPostReducer = createReducer(
  initialState,
  on(allMyPostLoaded, (state, action) => adapter.addMany(action.posts, { ...state, areMyPostsLoaded: true })),
  on(logout, (state, action) => adapter.removeAll({ ...state, areMyPostsLoaded: false })),
  on(myPostUpdated, (state, action) => adapter.updateOne(action.update, state)),
  on(updateMyClientPost, (state, action) => adapter.updateOne(action.update, state))
);

export const { selectAll } = adapter.getSelectors();

export const metaReducers: MetaReducer<MyPostState>[] = !environment.production ? [] : [];
