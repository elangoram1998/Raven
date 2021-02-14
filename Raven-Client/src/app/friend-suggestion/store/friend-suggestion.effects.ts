import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { FSService } from '../services/fs.service';
import { allSuggestionsLoaded, loadFriendSuggestions } from './friend-suggestion.actions';



@Injectable()
export class FriendSuggestionEffects {

  loadFriendSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFriendSuggestions),
      concatMap(action => this.fsHttpService.getAllFSList()),
      map(suggestions => allSuggestionsLoaded({ suggestions }))
    )
  )

  constructor(private actions$: Actions, private fsHttpService: FSService) { }

}
