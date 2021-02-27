import * as fromMyPost from './my-post.actions';

describe('loadMyPosts', () => {
  it('should return an action', () => {
    expect(fromMyPost.loadMyPosts().type).toBe('[MyPost] Load MyPosts');
  });
});
