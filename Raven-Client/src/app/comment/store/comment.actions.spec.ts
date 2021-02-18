import * as fromComment from './comment.actions';

describe('loadComments', () => {
  it('should return an action', () => {
    expect(fromComment.loadComments().type).toBe('[Comment] Load Comments');
  });
});
