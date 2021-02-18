import { Component, Input, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { noop, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { updateMyUserData } from 'src/app/auth/actions/user-data.actions';
import { selectUserData } from 'src/app/auth/selectors/user-data.selectors';
import { CommentService } from 'src/app/comment/services/comment.service';
import { loadComments } from 'src/app/comment/store/comment.actions';
import { loadAllComments } from 'src/app/comment/store/comment.selectors';
import { CommentSet } from 'src/app/model/comment-set';
import { Post } from 'src/app/model/post';
import { UserData } from 'src/app/model/user-data';
import { AppState } from 'src/app/reducers';
import { postUpdated, updateClientPost } from '../../store/post.actions';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {

  @Input() post!: Post;
  userData!: UserData;
  changes!: Post;
  userDataChanges!: UserData;
  comments!: CommentSet[];

  constructor(private store: Store<AppState>,
    private commentService: CommentService) { }

  ngOnInit(): void {
    this.changes = {
      ...this.post
    }
    this.store.pipe(select(selectUserData)).subscribe(
      data => {
        this.userData = { ...data }
      }
    );
  }

  likeImage() {
    this.changes.isMyLikedPost = !this.changes.isMyLikedPost;
    this.userData.liked_post = Object.assign([], this.userData.liked_post);
    if (this.changes.isMyLikedPost) {
      this.changes.total_likes += 1;
      this.userData.liked_post.push(this.post._id);
    }
    else {
      this.changes.total_likes -= 1;
      const index = this.userData.liked_post.indexOf(this.post._id);
      this.userData.liked_post.splice(index, 1);
    }
    const updatedPost = {
      ...this.post,
      ...this.changes
    }
    const update: Update<Post> = {
      id: this.post._id,
      changes: updatedPost
    }
    this.store.dispatch(postUpdated({ update }));
    this.store.dispatch(updateMyUserData({ userData: this.userData }));
  }

  saveImage() {
    this.changes.isMySavedPost = !this.changes.isMySavedPost;
    this.userData.saved_post = Object.assign([], this.userData.saved_post);
    if (this.changes.isMySavedPost) {
      this.userData.saved_post.push(this.post._id);
    }
    else {
      const index = this.userData.saved_post.indexOf(this.post._id);
      this.userData.saved_post.splice(index, 1);
    }
    const updatedPost = {
      ...this.post,
      ...this.changes
    }
    const update: Update<Post> = {
      id: this.post._id,
      changes: updatedPost
    }
    this.store.dispatch(postUpdated({ update }));
    this.store.dispatch(updateMyUserData({ userData: this.userData }));
  }

  displayComments() {
    this.store.pipe(select(loadAllComments)).pipe(
      tap(comments => {
        console.log(comments)
        if (!this.post.isMyCommentLoaded) {
          this.loadPostComments();
          if (comments.length > 0) {
            this.changes.isMyCommentLoaded = true;
            const updatedPost = {
              ...this.post,
              ...this.changes
            }
            const update: Update<Post> = {
              id: this.post._id,
              changes: updatedPost
            }
            this.store.dispatch(updateClientPost({ update }));
          }
        }
      }),
      map(comments => comments.filter(comment => comment.post_id == this.post._id))
    ).subscribe(res => {
      this.comments = res;
    })
    console.log(this.comments);
  }


  loadPostComments() {
    this.commentService.getMyPostComments(this.post._id).pipe(
      tap(comments => {
        console.log("comments: " + comments);
        this.store.dispatch(loadComments({ comments }));
      })
    ).subscribe(
      noop,
      error => {
        console.log(error);
      }
    )
  }

}
