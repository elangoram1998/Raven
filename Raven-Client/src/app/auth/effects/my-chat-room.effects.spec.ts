import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MyChatRoomEffects } from './my-chat-room.effects';

describe('MyChatRoomEffects', () => {
  let actions$: Observable<any>;
  let effects: MyChatRoomEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyChatRoomEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MyChatRoomEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
