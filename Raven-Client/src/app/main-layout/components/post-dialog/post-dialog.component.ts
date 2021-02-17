import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { PostService } from 'src/app/post/services/post.service';
import { addNewPost } from 'src/app/post/store/post.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  selectedFile!: File;
  imageUrl!: any;
  isImage: boolean = true;

  constructor(private fb: FormBuilder,
    private postService: PostService,
    private dialogRef: MatDialogRef<PostDialogComponent>,
    private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  postForm = this.fb.group({
    image: ['', Validators.required],
    caption: ['']
  });

  onChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0];
      console.log(this.selectedFile);
      if (this.selectedFile.type === 'video/mp4') {
        this.isImage = false;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.postForm.get('image')?.setValue(this.selectedFile);
        this.imageUrl = reader.result;
      }
    }
  }

  postMedia() {
    const formData = new FormData();
    if (this.postForm.get('caption')?.value) {
      formData.append('caption', this.postForm.get('caption')?.value);
    }
    formData.append('post', this.postForm.get('image')?.value);
    this.postService.newPost(formData).pipe(
      tap(
        res => {
          this.store.dispatch(addNewPost({ post: res }));
        }
      )
    ).subscribe(
      () => {
        this.dialogRef.close('success');
      },
      error => {
        this.dialogRef.close('error');
      }
    )
  }

}
