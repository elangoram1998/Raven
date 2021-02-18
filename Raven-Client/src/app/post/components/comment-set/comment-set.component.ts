import { Component, Input, OnInit } from '@angular/core';
import { CommentSet } from 'src/app/model/comment-set';

@Component({
  selector: 'app-comment-set',
  templateUrl: './comment-set.component.html',
  styleUrls: ['./comment-set.component.scss']
})
export class CommentSetComponent implements OnInit {

  @Input() commentSet!: CommentSet;

  constructor() { }

  ngOnInit(): void {
    console.log(this.commentSet);
  }

}
