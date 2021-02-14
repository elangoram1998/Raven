import * as fromFriendSuggestion from './friend-suggestion.actions';

describe('loadFriendSuggestions', () => {
  it('should return an action', () => {
    expect(fromFriendSuggestion.loadFriendSuggestions().type).toBe('[FriendSuggestion] Load FriendSuggestions');
  });
});
