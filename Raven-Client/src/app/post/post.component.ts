import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { AppState } from '../reducers';
import { selectAllPost } from './store/post.selectors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  loadMyFeeds$!: Observable<Post[]>;
  isPostEmpty: boolean = true;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loadMyFeeds$ = this.store.pipe(
      select(selectAllPost)
    );
    this.loadMyFeeds$.subscribe(
      posts => {
        if (posts.length > 0) {
          this.isPostEmpty = false;
        }
      }
    )
  }

}
