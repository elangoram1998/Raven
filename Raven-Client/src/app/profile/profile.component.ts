import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserData } from '../auth/selectors/user-data.selectors';
import { selectAvatar, selectUser, selectUsername } from '../auth/selectors/user.selectors';
import { Post } from '../model/post';
import { User } from '../model/user';
import { UserData } from '../model/user-data';
import { AppState } from '../reducers';
import { ListFollowComponent } from './components/list-follow/list-follow.component';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  myAvatar!: string;
  username!: string;
  followersArray!: any[];
  followingsArray!: string[];
  followersData!: any[];
  followingsData!: any[];
  userData!: UserData | undefined;
  myPosts: Post[] = [];
  mySavedPosts$!: Observable<Post[]>;
  noOfPosts: number = 0;

  constructor(private store: Store<AppState>,
    private profileService: ProfileService,
    private dialog: MatDialog) { }

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
        this.profileService.getUsersData(this.followersArray).subscribe(
          res => {
            this.followersData = res;
          },
          error => {
            console.log(error);
          }
        );
        this.profileService.getUsersData(this.followingsArray).subscribe(
          res => {
            this.followingsData = res;
          },
          error => {
            console.log(error);
          }
        )
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
    );
    this.mySavedPosts$ = this.profileService.getSavedPosts();
    this.mySavedPosts$.subscribe(
      posts => {
        this.noOfPosts = posts.length;
      }
    );
  }

  viewFollowers() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400px";
    dialogConfig.data = {
      type: 'followers',
      follow: this.followersData
    };
    this.dialog.open(ListFollowComponent, dialogConfig);
  }
  viewFollowings() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400px";
    dialogConfig.data = {
      type: 'followings',
      follow: this.followingsData
    };
    this.dialog.open(ListFollowComponent, dialogConfig);
  }

}
