import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { PostService } from '../post/services/post.service';
import { ProfileService } from '../profile/services/profile.service';
import { allMyPostLoaded, loadMyPosts, myPostUpdated } from './store/my-post.actions';



@Injectable()
export class MyPostEffects {

  loadMyPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMyPosts),
      concatMap(action => this.profileService.getMyPosts()),
      map(posts => allMyPostLoaded({ posts }))
    )
  );

  updateMyPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(myPostUpdated),
      concatMap((action) => this.postService.updatePost(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions, private profileService: ProfileService, private postService: PostService) { }

}
