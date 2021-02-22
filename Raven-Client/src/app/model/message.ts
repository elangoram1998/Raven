export interface Message {
    user_id: {
        username: string,
        _id: string,
        avatar: string
    },
    text: string,
    createdAt: Date
}
