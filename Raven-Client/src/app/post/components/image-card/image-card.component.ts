import { Component, Input, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { updateMyUserData } from 'src/app/auth/actions/user-data.actions';
import { selectUserData } from 'src/app/auth/selectors/user-data.selectors';
import { Post } from 'src/app/model/post';
import { UserData } from 'src/app/model/user-data';
import { AppState } from 'src/app/reducers';
import { postUpdated } from '../../store/post.actions';

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

  constructor(private store: Store<AppState>) { }

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
    // const updatedUserData = {
    //   ...this.userData,
    //   ...this.userDataChanges
    // }
    const update: Update<Post> = {
      id: this.post._id,
      changes: updatedPost
    }
    this.store.dispatch(postUpdated({ update }));
    this.store.dispatch(updateMyUserData({ userData: this.userData }));
  }

}
