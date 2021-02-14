import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { PostService } from './services/post.service';
import { allPostLoaded, loadPosts } from './store/post.actions';



@Injectable()
export class PostEffects {

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      concatMap(action => this.postService.getMyFeed()),
      map(posts => allPostLoaded({ posts }))
    )
  )

  constructor(private actions$: Actions, private postService: PostService) { }

}
