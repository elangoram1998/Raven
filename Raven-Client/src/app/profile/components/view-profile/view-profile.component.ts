import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { UserData } from 'src/app/model/user-data';
import { ProfileService } from '../../services/profile.service';
import { ListFollowComponent } from '../list-follow/list-follow.component';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  userId!: string;
  profile!: User;
  userData!: UserData;
  posts: Post[] = [];
  avatar: string = "";
  username: string = "";
  followersArray: string[] = [];
  followingsArray: string[] = [];
  followersData!: any[];
  followingsData!: any[];

  constructor(private route: ActivatedRoute,
    private profileService: ProfileService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params.id;
    });
    console.log(this.userId);
    this.profileService.viewProfile(this.userId).subscribe(
      res => {
        console.log(res);
        this.profile = res['profileData'];
        this.userData = res['userData'];
        this.posts = res['post'];
        this.avatar = this.profile.avatar;
        this.username = this.profile.username;
        this.followersArray = this.userData.followers;
        this.followingsArray = this.userData.followings;
        console.log("user: ", this.profile);
        console.log("userdata: " + this.userData);
        console.log("post: ", this.posts);
      },
      error => {
        console.log(error);
      }
    );
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
