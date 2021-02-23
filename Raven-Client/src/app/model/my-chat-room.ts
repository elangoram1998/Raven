export interface MyChatRoom {
    user_id: {
        _id: string,
        username: string,
        avatar: string
    }
    room_id: string,
    total_seen_messages: number,
    unseenMsg: number
}
