import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUserData } from '../auth/selectors/user-data.selectors';
import { selectAvatar, selectUser, selectUsername } from '../auth/selectors/user.selectors';
import { Post } from '../model/post';
import { User } from '../model/user';
import { UserData } from '../model/user-data';
import { AppState } from '../reducers';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  myAvatar!: string;
  username!: string;
  followersArray!: string[];
  followingsArray!: string[];
  userData!: UserData | undefined;
  myPosts: Post[] = [];

  constructor(private store: Store<AppState>,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.store.pipe(select(selectAvatar)).subscribe(
      avatar => {
        this.myAvatar = avatar || "";
      }
    );
    this.store.pipe(select(selectUsername)).subscribe(
      name => {
        this.username = name || "";
      }
    )
    this.store.pipe(select(selectUserData)).subscribe(
      userData => {
        this.userData = userData;
        this.followersArray = this.userData.followers;
        this.followingsArray = this.userData.followings;
      }
    );
    this.profileService.getMyPosts().subscribe(
      posts => {
        console.log(posts);
        this.myPosts = posts;
      },
      error => {
        console.log(error);
      }
    )
  }

}
