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

export const selectMyPostById = createSelector(
    selectAllMyPost,
    (posts: any[], props: { id: string; }) => posts.find(post => post._id === props.id)
);