import { CommentModel } from './comment';

export interface CommentSet {
    _id: string,
    post_id: string,
    comment: CommentModel,
    replys: [CommentModel],
    createdAt: Date
}
