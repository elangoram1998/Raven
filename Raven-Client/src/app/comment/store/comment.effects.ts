import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { CommentService } from '../services/comment.service';
import { likeComment } from './comment.actions';



@Injectable()
export class CommentEffects {

  likeComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(likeComment),
      concatMap((action) => {
        const commentId = action.update.changes.comment?._id || "";
        const changes = action.update.changes.comment?.total_likes || 0;
        return this.commentService.likeComment(commentId, changes);
      })
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions, private commentService: CommentService) { }

}
