import { MyChatRoom } from "./my-chat-room";

export interface AddFriendRes {
    isMutualFriend: boolean,
    payload: MyChatRoom
}
