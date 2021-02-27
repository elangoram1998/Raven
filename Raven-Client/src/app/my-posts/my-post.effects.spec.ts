import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MyPostEffects } from './my-post.effects';

describe('MyPostEffects', () => {
  let actions$: Observable<any>;
  let effects: MyPostEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyPostEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MyPostEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
