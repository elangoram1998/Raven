import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, first, tap } from "rxjs/operators";
import { updateAllChatRooms } from "../auth/actions/my-chat-rooms.actions";
import { areChatRoomsLoaded, selectAllMyChatRooms } from "../auth/selectors/my-chat-room.selectors";
import { ChatApiService } from "../chat/services/chat-api.service";
import { AppState } from "../reducers";


@Injectable({
    providedIn: 'root'
})
export class ChatResolver implements Resolve<any>{

    constructor(private store: Store<AppState>, private chatService: ChatApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            select(areChatRoomsLoaded),
            tap(loaded => {
                if (loaded) {
                    this.chatService.getUpdatedChatRooms().subscribe(
                        chatRooms => {
                            console.log("chat rooms: " + chatRooms);
                            let updates = chatRooms.map(room => {
                                console.log(room)
                                return Object.assign({}, { id: room.user_id._id, changes: room })
                            })
                            this.store.dispatch(updateAllChatRooms({ update: updates }));
                        },
                        error => {
                            console.log(error);
                        }
                    )
                }
            }),
            filter(loaded => loaded),
            first()
        )
    }

}