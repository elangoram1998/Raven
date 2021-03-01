import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { updateUser } from 'src/app/auth/actions/auth.actions';
import { updateUserData } from 'src/app/auth/actions/user-data.actions';
import { selectUserData } from 'src/app/auth/selectors/user-data.selectors';
import { selectAvatar, selectUser } from 'src/app/auth/selectors/user.selectors';
import { User } from 'src/app/model/user';
import { UserData } from 'src/app/model/user-data';
import { AppState } from 'src/app/reducers';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  myAvatar!: string;
  selectedFile!: File;
  profileData!: User | undefined;
  userData!: UserData;
  userEditForm!: FormGroup;
  profileType!: boolean;

  constructor(private store: Store<AppState>,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectAvatar)).subscribe(
      avatar => {
        this.myAvatar = avatar || "";
      }
    );
    this.store.pipe(select(selectUser)).subscribe(
      user => {
        this.profileData = user;
        if (this.profileData?.profile_type === 'public') {
          this.profileType = true;
        }
        else {
          this.profileType = false;
        }
      }
    );
    this.store.pipe(select(selectUserData)).subscribe(
      userdata => {
        this.userData = userdata;
      }
    );

    this.userEditForm = this.fb.group({
      username: [this.profileData?.username, Validators.required],
      bio: [this.userData?.bio],
      email: [this.profileData?.email,
      [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      profile_type: this.profileType
    })
  }

  avatarForm = this.fb.group({
    image: ['', Validators.required],
  });


  onChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0];
      this.avatarForm.get('image')?.setValue(this.selectedFile);
      this.changeProfilePicture();
    }
  }

  changeProfilePicture() {
    const formData = new FormData();
    formData.append('post', this.avatarForm.get('image')?.value);
    this.profileService.changeProfilePic(formData).pipe(
      tap(user => {
        this.store.dispatch(updateUser({ user }));
      })
    ).subscribe(
      () => {
        this.snackBar.open('Successfully Updated', 'Reload to see', {
          duration: 3000
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  removeProfilePicture() {
    this.profileService.removeProfilePic().pipe(
      tap(user => {
        this.store.dispatch(updateUser({ user }));
      })
    ).subscribe(
      () => {
        this.snackBar.open('Removed your profile picture', 'Reload to see', {
          duration: 3000
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  editUser() {
    console.log(this.userEditForm.value);
    this.profileService.editProfile(this.userEditForm.value).pipe(
      tap((res: any) => {
        const user = res['user'];
        const userData = res['userData'];
        this.store.dispatch(updateUser({ user }));
        this.store.dispatch(updateUserData({ userData }));
      })).subscribe(
        () => {
          this.snackBar.open('Profile Updated', 'Reload to see', {
            duration: 3000
          })
        },
        (error) => {
          console.log(error);
        }
      )
  }

}
