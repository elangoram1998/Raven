import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyPostState, selectAll } from '../reducers';

export const selectPostState = createFeatureSelector<MyPostState>("myPost");

export const areMyPostLoaded = createSelector(
    selectPostState,
    state => state.areMyPostsLoaded
)

export const selectAllMyPost = createSelector(
    selectPostState,
    selectAll
);

export const selectAllMyPhotos = createSelector(
    selectAllMyPost,
    (posts) => posts.filter(post => post.media_type === 'jpg' || post.media_type === 'png' || post.media_type === 'jpeg')
);

export const selectAllMyVideos = createSelector(
    selectAllMyPost,
    (posts) => posts.filter(post => post.media_type === 'mp4')
);

export const selectMyPostById = createSelector(
    selectAllMyPost,
    (posts: any[], props: { id: string; }) => posts.find(post => post._id === props.id)
);