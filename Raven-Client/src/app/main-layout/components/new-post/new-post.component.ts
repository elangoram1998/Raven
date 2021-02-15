import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAvatar } from 'src/app/auth/selectors/user.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  myAvatar$!: Observable<String | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.myAvatar$ = this.store.pipe(select(selectAvatar));
  }

}
