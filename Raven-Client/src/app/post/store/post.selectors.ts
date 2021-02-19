import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import { PostState, selectAll } from '../reducers';

export const selectPostState = createFeatureSelector<PostState>("post");

export const arePostLoaded = createSelector(
    selectPostState,
    state => state.arePostLoaded
)

export const selectAllPost = createSelector(
    selectPostState,
    selectAll
);

export const selectPostById = createSelector(
    selectAllPost,
    (posts: any[], props: { id: string; }) => posts.find(post => post._id === props.id)
);