import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { AppState } from '../reducers';
import { MyPostDialogComponent } from './components/my-post-dialog/my-post-dialog.component';
import { selectAllMyPhotos, selectAllMyPost, selectAllMyVideos } from './store/my-post.selectors';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  myPhotos$!: Observable<Post[]>;
  noOfPics: number = 0;

  constructor(private store: Store<AppState>,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.myPhotos$ = this.store.pipe(select(selectAllMyPhotos));
    this.myPhotos$.subscribe(
      size => {
        this.noOfPics = size.length;
      }
    )
  }

  viewPost(post: Post) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px";
    dialogConfig.data = {
      post
    };
    this.dialog.open(MyPostDialogComponent, dialogConfig);
  }

}
