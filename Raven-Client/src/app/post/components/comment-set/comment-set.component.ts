import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommentService } from 'src/app/comment/services/comment.service';
import { updateComment } from 'src/app/comment/store/comment.actions';
import { selectCommentById } from 'src/app/comment/store/comment.selectors';
import { CommentSet } from 'src/app/model/comment-set';
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

  constructor(private fb: FormBuilder,
    private commentService: CommentService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    console.log(this.commentSet);
    this.store.pipe(select(selectCommentById, { id: this.commentSet._id })).subscribe(
      comment => {
        this.changes = { ...comment }
      });
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

}
