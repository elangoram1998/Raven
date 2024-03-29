import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { updateMyUserData } from 'src/app/auth/actions/user-data.actions';
import { selectUserData } from 'src/app/auth/selectors/user-data.selectors';
import { CommentService } from 'src/app/comment/services/comment.service';
import { insertComment, loadComments } from 'src/app/comment/store/comment.actions';
import { selectCommentsByPostId } from 'src/app/comment/store/comment.selectors';
import { CommentSet } from 'src/app/model/comment-set';
import { Post } from 'src/app/model/post';
import { UserData } from 'src/app/model/user-data';
import { AppState } from 'src/app/reducers';
import { myPostUpdated, updateMyClientPost } from '../../store/my-post.actions';
import { selectMyPostById } from '../../store/my-post.selectors';

@Component({
  selector: 'app-my-post-dialog',
  templateUrl: './my-post-dialog.component.html',
  styleUrls: ['./my-post-dialog.component.scss']
})
export class MyPostDialogComponent implements OnInit {

  //@Input() post!: Post;
  post!: Post;
  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;
  userData!: UserData;
  changes!: Post;
  userDataChanges!: UserData;
  comments: CommentSet[] = [];
  showComments: boolean = false;

  constructor(private store: Store<AppState>,
    private commentService: CommentService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { post: Post },
    private dialogRef: MatDialogRef<MyPostDialogComponent>,) {
    this.post = data.post;
  }

  commentForm = this.fb.group({
    text: ['', Validators.required]
  });

  get Text() {
    return this.commentForm.get('text');
  }

  ngOnInit(): void {
    this.store.pipe(select(selectMyPostById, { id: this.post._id })).subscribe(
      post => {
        console.log(post)
        this.changes = {
          ...post
        }
      }
    )
    this.store.pipe(select(selectUserData)).subscribe(
      data => {
        this.userData = { ...data }
      }
    );
    this.loadPostComments();
    this.store.pipe(select(selectCommentsByPostId, { id: this.post._id })).subscribe(
      comments => {
        console.log(comments)
        this.comments = comments;
      }
    )
  }

  loadPostComments() {
    console.log("comes here")
    if (!this.changes.isMyCommentLoaded) {
      this.commentService.getMyPostComments(this.post._id).pipe(
        tap(comments => {
          console.log("comments: " + comments);
          this.store.dispatch(loadComments({ comments }));
          console.log("is comments loaded: " + this.changes.isMyCommentLoaded);
          this.changes.isMyCommentLoaded = true;
          const updatedPost = {
            ...this.post,
            ...this.changes
          }
          const update: Update<Post> = {
            id: this.post._id,
            changes: updatedPost
          }
          this.store.dispatch(updateMyClientPost({ update }));
        })
      ).subscribe(
        noop,
        error => {
          console.log(error);
        }
      )
    }
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
    this.store.dispatch(myPostUpdated({ update }));
    this.store.dispatch(updateMyUserData({ userData: this.userData }));
    this.dialogRef.close();
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
    this.store.dispatch(myPostUpdated({ update }));
    this.store.dispatch(updateMyUserData({ userData: this.userData }));
    this.dialogRef.close();
  }

  addComment() {
    console.log(this.Text?.value);
    this.commentService.addComment(this.post._id, this.Text?.value).pipe(
      tap(commentSet => {
        console.log("commentset: " + commentSet);
        this.updateTotalComment();
        this.store.dispatch(insertComment({ commentSet }));
      })
    ).subscribe(  
      noop,
      error => {
        console.log(error);
      }
    )
    this.dialogRef.close();
    if (this.commentForm.valid) {
      setTimeout(() => this.formGroupDirective.resetForm(), 0)
    }
  }

  updateTotalComment() {
    this.changes.total_comments += 1;
    const updatedPost = {
      ...this.post,
      ...this.changes
    }
    const update: Update<Post> = {
      id: this.post._id,
      changes: updatedPost
    }
    this.store.dispatch(updateMyClientPost({ update }));
  }

}
