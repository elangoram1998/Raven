import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FriendSuggestionEffects } from './friend-suggestion.effects';

describe('FriendSuggestionEffects', () => {
  let actions$: Observable<any>;
  let effects: FriendSuggestionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FriendSuggestionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FriendSuggestionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
