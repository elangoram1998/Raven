import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/model/post';

export const loadPosts = createAction(
  '[Post] Load Posts'
);

export const allPostLoaded = createAction(
  '[Load Post Effect] Post Loaded',
  props<{ posts: Post[] }>()
);

export const addNewPost = createAction(
  '[New Post] Add New',
  props<{ post: Post }>()
);

export const postUpdated = createAction(
  '[Liked Post] Post Updated',
  props<{ update: Update<Post> }>()
);

export const updateClientPost = createAction(
  '[Post Update] Comment Status Updated',
  props<{ update: Update<Post> }>()
)



