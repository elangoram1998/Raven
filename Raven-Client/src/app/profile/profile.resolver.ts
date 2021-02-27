import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, first, tap } from "rxjs/operators";
import { loadMyPosts } from "../my-posts/store/my-post.actions";
import { areMyPostLoaded } from "../my-posts/store/my-post.selectors";
import { AppState } from "../reducers";


@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<any>{
    constructor(private store: Store<AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            select(areMyPostLoaded),
            tap(loaded => {
                if(!loaded){
                    this.store.dispatch(loadMyPosts())
                }
            }),
            filter(loaded => loaded),
            first()
        )
    }

}