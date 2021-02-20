import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { selectMyLikedComments, selectMyLikedPosts, selectMySavedPosts } from "../auth/selectors/user-data.selectors";
import { AppState } from "../reducers";

@Injectable({
    providedIn: 'root'
})
export class CommonUtils {

    myLikedPosts!: string[];
    mySavedPosts!: string[];
    myLikedComments!: string[];

    constructor(private store: Store<AppState>) { }

    public get headers() {
        const token = localStorage.getItem('token');
        const header = new HttpHeaders({
            "authorization": "Bearer " + token
        });
        return header;
    }

    public IsLiked(postId: string) {
        this.store.pipe(select(selectMyLikedPosts)).subscribe(
            posts => {
                this.myLikedPosts = posts;
            }
        );
        if (this.myLikedPosts.includes(postId)) {
            return true;
        }
        return false;
    }

    public isSaved(postId: string) {
        this.store.pipe(select(selectMySavedPosts)).subscribe(
            posts => {
                this.mySavedPosts = posts;
            }
        );
        if (this.mySavedPosts.includes(postId)) {
            return true;
        }
        return false;
    }

    public isLikedComment(commentId: string) {
        this.store.pipe(select(selectMyLikedComments)).subscribe(
            comments => {
                this.myLikedComments = comments;
            }
        );
        if (this.myLikedComments.includes(commentId)) {
            return true;
        }
        return false;
    }
}