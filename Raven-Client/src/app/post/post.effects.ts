import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { PostService } from './services/post.service';
import { allPostLoaded, loadPosts, postUpdated } from './store/post.actions';


@Injectable()
export class PostEffects {

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      concatMap(action => this.postService.getMyFeed()),
      map(posts => allPostLoaded({ posts }))
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postUpdated),
      concatMap((action) => this.postService.updatePost(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions, private postService: PostService) { }

}
