import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { selectAvatar } from 'src/app/auth/selectors/user.selectors';
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

  constructor(private store: Store<AppState>,
    private fb: FormBuilder,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.store.pipe(select(selectAvatar)).subscribe(
      avatar => {
        this.myAvatar = avatar || "";
      }
    );
  }

  avatarForm = this.fb.group({
    image: ['', Validators.required],
  });

  onChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0];
      console.log(this.selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.avatarForm.get('image')?.setValue(this.selectedFile);
      }
    }
  }

  changeProfilePicture() {
    const formData = new FormData();
    formData.append('post', this.avatarForm.get('image')?.value);
    this.profileService.changeProfilePic(formData)
  }

}
