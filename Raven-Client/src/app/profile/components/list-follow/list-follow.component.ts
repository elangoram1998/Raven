import { Inject } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { deleteChatRoom } from 'src/app/auth/actions/my-chat-rooms.actions';
import { updateUserData } from 'src/app/auth/actions/user-data.actions';
import { selectRoomById } from 'src/app/auth/selectors/my-chat-room.selectors';
import { selectUserData } from 'src/app/auth/selectors/user-data.selectors';
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { UserData } from 'src/app/model/user-data';
import { AppState } from 'src/app/reducers';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-list-follow',
  templateUrl: './list-follow.component.html',
  styleUrls: ['./list-follow.component.scss']
})
export class ListFollowComponent implements OnInit {

  usersData!: any[];
  type!: string;
  room!: MyChatRoom;
  userData!: UserData;
  isEmpty: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: { follow: any[], type: string },
    private profileService: ProfileService,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<ListFollowComponent>,
    private router: Router,
    private route: ActivatedRoute) {
    this.usersData = data.follow;
    this.type = data.type;

  }

  ngOnInit(): void {
    this.store.pipe(select(selectUserData)).subscribe(
      data => {
        this.userData = { ...data };
        console.log(data)
      }
    );
    if (this.usersData.length > 0) {
      this.isEmpty = true;

    }
    console.log(this.isEmpty)
  }

  unFollow(id: string) {

    this.store.pipe(select(selectRoomById, { id })).subscribe(
      room => {
        this.room = room;
      });

    this.profileService.updateFollowData(id).pipe(
      tap(res => {
        this.userData.followings = Object.assign([], this.userData.followings);
        const index = this.userData.followings.indexOf(id);
        this.userData.followings.splice(index, 1);
        this.store.dispatch(updateUserData({ userData: this.userData }));
        if (this.room) {
          this.store.dispatch(deleteChatRoom({ id: this.room.user_id._id }));
        }
      })
    ).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      });

    this.dialogRef.close();
  }

  viewProfile(id: string) {
    this.router.navigate(['home/view-profile/', id]);
    this.dialogRef.close();
  }

}
