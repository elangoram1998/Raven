import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, first, tap } from "rxjs/operators";
import { loadFriendSuggestions } from "../friend-suggestion/store/friend-suggestion.actions";
import { areFSLoaded } from "../friend-suggestion/store/friend-suggestion.selectors";
import { loadPosts } from "../post/store/post.actions";
import { arePostLoaded } from "../post/store/post.selectors";
import { AppState } from "../reducers";


@Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<any>{

    constructor(private store: Store<AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            select(arePostLoaded),
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(loadPosts())
                }
            }),
            filter(loaded => loaded),
            first()
        )
    }

}