import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/model/post';

export const loadMyPosts = createAction(
  '[MyPost] Load MyPosts'
);

export const allMyPostLoaded = createAction(
  '[Load MyPost] MyPost Loaded',
  props<{ posts: Post[] }>()
);

export const myPostUpdated = createAction(
  '[Liked MyPost] MyPost Updated',
  props<{ update: Update<Post> }>()
);

export const updateMyClientPost = createAction(
  '[MyPost Update] Comment Status Updated',
  props<{ update: Update<Post> }>()
)


