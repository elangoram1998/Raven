export interface Post {
    _id: string,
    user_id: {
        _id: string,
        username: string,
        avatar: string
    },
    caption: string,
    media_type: string,
    storage_url: string,
    total_likes: number,
    total_comments: number,
    isMyLikedPost: boolean,
    isMySavedPost: boolean,
    createdAt: Date
}
