import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/model/post';
import { CommonUtils } from 'src/app/utils/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private common: CommonUtils) { }

  getMyPosts(): Observable<Post[]> {
    const headers = this.common.headers;
    return this.http.get<Post[]>(environment.getMyPosts, { headers }).pipe(
      map(res => {
        res.forEach(post => {
          post.isMyLikedPost = this.common.IsLiked(post._id);
          post.isMySavedPost = this.common.isSaved(post._id);
          post.isMyCommentLoaded = false;
        });
        return res;
      })
    )
  }

  getSavedPosts(): Observable<Post[]> {
    const headers = this.common.headers;
    return this.http.get<Post[]>(environment.getSavedPosts, { headers });
  }

  changeProfilePic(fd: FormData) {
    const headers = this.common.headers;
  }
  removeProfilePic() {
    const headers = this.common.headers;

  }
}
