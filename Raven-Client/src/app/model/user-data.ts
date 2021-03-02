import { MyChatRoom } from "./my-chat-room";

export interface UserData {
    user_id: string,
    bio?: string,
    followers: [string],
    followings: [string],
    liked_post: [string],
    saved_post: [string],
    liked_comments: [string],
    my_chat_rooms: [MyChatRoom]
}
