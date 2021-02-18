import { createAction, props } from '@ngrx/store';
import { CommentSet } from 'src/app/model/comment-set';

export const loadComments = createAction(
  '[Comment] Load Comments',
  props<{ comments: CommentSet[] }>()
);




