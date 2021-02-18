export interface CommentModel {
    _id: string,
    user_id: {
        _id: string,
        username: string,
        avatar: string
    },
    text: string,
    total_likes: number,
    createdAt: Date
}
