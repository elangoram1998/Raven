import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { addNewChatRoom } from 'src/app/auth/actions/my-chat-rooms.actions';
import { AddFriendRes } from 'src/app/model/add-friend-res';
import { FSService } from '../services/fs.service';
import { allSuggestionsLoaded, loadFriendSuggestions, removeFriendSuggestion } from './friend-suggestion.actions';



@Injectable()
export class FriendSuggestionEffects {

  loadFriendSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFriendSuggestions),
      concatMap(action => this.fsHttpService.getAllFSList()),
      map(suggestions => allSuggestionsLoaded({ suggestions })),
    )
  )

  removeFriendSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFriendSuggestion),
      concatMap(action => this.fsHttpService.addFriend(action.id).pipe(
        map(res => {
          if (res.isMutualFriend) {
            addNewChatRoom({ newRoom: res.payload })
          }
          return action;
        })
      )),
    ), { dispatch: false }
  )

  constructor(private actions$: Actions, private fsHttpService: FSService) { }

}
