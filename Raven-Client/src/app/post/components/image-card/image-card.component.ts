import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { noop, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { updateMyUserData } from 'src/app/auth/actions/user-data.actions';
import { selectUserData } from 'src/app/auth/selectors/user-data.selectors';
import { CommentService } from 'src/app/comment/services/comment.service';
import { insertComment, loadComments } from 'src/app/comment/store/comment.actions';
import { loadAllComments, selectCommentsByPostId } from 'src/app/comment/store/comment.selectors';
import { CommentSet } from 'src/app/model/comment-set';
import { Post } from 'src/app/model/post';
import { UserData } from 'src/app/model/user-data';
import { AppState } from 'src/app/reducers';
import { postUpdated, updateClientPost } from '../../store/post.actions';
import { selectPostById } from '../../store/post.selectors';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {

  @Input() post!: Post;
  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;
  userData!: UserData;
  changes!: Post;
  userDataChanges!: UserData;
  comments: CommentSet[]=[];
  showComments: boolean = false;

  constructor(private store: Store<AppState>,
    private commentService: CommentService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.store.pipe(select(selectPostById, { id: this.post._id })).subscribe(
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

  commentForm = this.fb.group({
    text: ['', Validators.required]
  });

  get Text() {
    return this.commentForm.get('text');
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
    this.store.dispatch(updateClientPost({ update }));
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
          this.store.dispatch(updateClientPost({ update }));
        })
      ).subscribe(
        noop,
        error => {
          console.log(error);
        }
      )
    }
  }

}
