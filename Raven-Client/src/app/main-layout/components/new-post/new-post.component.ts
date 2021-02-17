import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAvatar } from 'src/app/auth/selectors/user.selectors';
import { AppState } from 'src/app/reducers';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  myAvatar$!: Observable<String | undefined>;

  constructor(private store: Store<AppState>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.myAvatar$ = this.store.pipe(select(selectAvatar));
  }

  openDialog() {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res == 'success') {
        this.snackBar.open('Successfully Posted', 'Reload to see', {
          duration: 3000
        })
      } else if (res == 'error') {
        this.snackBar.open('Failed to post picture', 'Close', {
          duration: 3000
        })
      }
    })

  }
}
