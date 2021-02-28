import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post';
import { AppState } from 'src/app/reducers';
import { selectAllMyVideos } from '../../store/my-post.selectors';
import { MyPostDialogComponent } from '../my-post-dialog/my-post-dialog.component';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss']
})
export class MyVideosComponent implements OnInit {

  myVideos$!: Observable<Post[]>;
  noOfVideos: number = 0;

  constructor(private store: Store<AppState>,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.myVideos$ = this.store.pipe(select(selectAllMyVideos));
    this.myVideos$.subscribe(
      size => {
        this.noOfVideos = size.length;
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
