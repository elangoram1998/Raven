import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { isLoggedIn, selectAuthState } from "./selectors/user.selectors";

@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

    constructor(private store: Store<AppState>,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = localStorage.getItem('user');
        if (!user) {
            this.router.navigateByUrl('/SignIn');
        }
        return true;
    }

}