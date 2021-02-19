import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { CommentSet } from 'src/app/model/comment-set';

export const loadComments = createAction(
  '[Comment] Load Comments',
  props<{ comments: CommentSet[] }>()
);

export const insertComment = createAction(
  '[Insert Comment] Add One',
  props<{ commentSet: CommentSet }>()
);

export const updateComment = createAction(
  '[Update Comment] CommentSet Update',
  props<{ update: Update<CommentSet> }>()
);



