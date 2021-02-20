import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { updateMyUserData } from 'src/app/auth/actions/user-data.actions';
import { selectUserData } from 'src/app/auth/selectors/user-data.selectors';
import { CommentService } from 'src/app/comment/services/comment.service';
import { likeComment, updateComment } from 'src/app/comment/store/comment.actions';
import { selectCommentById } from 'src/app/comment/store/comment.selectors';
import { CommentModel } from 'src/app/model/comment';
import { CommentSet } from 'src/app/model/comment-set';
import { UserData } from 'src/app/model/user-data';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-comment-set',
  templateUrl: './comment-set.component.html',
  styleUrls: ['./comment-set.component.scss']
})
export class CommentSetComponent implements OnInit {

  @Input() commentSet!: CommentSet;
  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;
  @Output() addedReply: EventEmitter<string> = new EventEmitter();
  replyAdded: boolean = false;
  changes!: CommentSet;
  temp: CommentSet = {
    _id: "",
    comment: {
      _id: "",
      createdAt: new Date(),
      isMyLikedComment: false,
      text: "",
      total_likes: 0,
      user_id: {
        _id: "",
        avatar: "",
        username: ""
      }
    },
    post_id: "",
    replys: [{
      _id: "",
      createdAt: new Date(),
      isMyLikedComment: false,
      text: "",
      total_likes: 0,
      user_id: {
        _id: "",
        avatar: "",
        username: ""
      }
    }],
    createdAt: new Date()
  };
  reply!: CommentModel;
  userData!: UserData;
  replyComment!: CommentModel | undefined;

  constructor(private fb: FormBuilder,
    private commentService: CommentService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    //console.log(this.commentSet);
    this.store.pipe(select(selectCommentById, { id: this.commentSet._id })).subscribe(
      comment => {
        console.log(comment)
        this.changes = {
          ...comment
        }
      });

    this.store.pipe(select(selectUserData)).subscribe(
      data => {
        this.userData = { ...data }
      }
    );
  }
  replyForm = this.fb.group({
    text: ['', Validators.required]
  });

  addReply() {
    this.replyAdded = true;
  }
  cancelReply() {
    this.replyAdded = false;
  }

  addReplyComment() {
    console.log(this.replyForm.value);
    this.replyAdded = false;
    this.commentService.addReply(this.commentSet.post_id, this.commentSet._id, this.replyForm.get('text')?.value).pipe(
      tap(reply => {
        this.replyForm.reset();
        this.changes.replys = Object.assign([], this.changes.replys);
        this.changes.replys?.push(reply);
        const updatedComment = {
          ...this.commentSet,
          ...this.changes
        }
        const update: Update<CommentSet> = {
          id: this.commentSet._id,
          changes: updatedComment
        }
        this.store.dispatch(updateComment({ update }));
        this.addedReply.emit("inc");
      })
    ).subscribe(
      noop,
      error => {
        console.log(error);
      }
    )
  }

  likeComment() {
    this.changes.comment = Object.assign({}, this.changes.comment);
    this.changes.comment.isMyLikedComment = !this.changes.comment.isMyLikedComment;
    this.userData.liked_comments = Object.assign([], this.userData.liked_comments);
    if (this.changes.comment.isMyLikedComment) {
      this.changes.comment.total_likes += 1;
      this.userData.liked_comments.push(this.changes.comment._id);
    }
    else {
      this.changes.comment.total_likes -= 1;
      const index = this.userData.liked_comments.indexOf(this.changes.comment._id);
      this.userData.liked_comments.splice(index, 1);
    }
    const updatedCommentSet = {
      ...this.commentSet,
      ...this.changes
    }
    const update: Update<CommentSet> = {
      id: this.commentSet._id,
      changes: updatedCommentSet
    }
    this.store.dispatch(likeComment({ update }));
    this.store.dispatch(updateMyUserData({ userData: this.userData }));
  }

  likeReply(replyId: string) {
    const index = this.changes.replys?.findIndex(reply => reply._id === replyId);
    this.reply = { ...this.changes.replys[index] };
    this.reply.isMyLikedComment = !this.reply.isMyLikedComment;
    this.userData.liked_comments = Object.assign([], this.userData.liked_comments);
    if (this.reply.isMyLikedComment) {
      this.reply.total_likes += 1;
      this.userData.liked_comments.push(replyId);
    }
    else {
      this.reply.total_likes -= 1;
      const userDataIndex = this.userData.liked_comments.indexOf(replyId);
      this.userData.liked_comments.splice(userDataIndex, 1);
    }
    this.changes.replys = Object.assign([], this.changes.replys);
    this.changes.replys.splice(index, 1, this.reply);
    console.log(this.changes)
    const updatedCommentSet = {
      ...this.commentSet,
      ...this.changes
    }
    console.log("reply updated: " + updatedCommentSet);
    const update: Update<CommentSet> = {
      id: this.commentSet._id,
      changes: updatedCommentSet
    }
    this.store.dispatch(updateComment({ update }));
    this.store.dispatch(updateMyUserData({ userData: this.userData }));
    this.commentService.likeComment(replyId, this.changes.replys[index].total_likes).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

}
