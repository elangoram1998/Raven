import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/model/post';
import { CommonUtils } from 'src/app/utils/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private common: CommonUtils) { }

  getMyFeed(): Observable<Post[]> {
    const headers = this.common.headers;
    return this.http.get<Post[]>(environment.myFeed, { headers }).pipe(
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

  newPost(fd: FormData): Observable<Post> {
    const headers = this.common.headers;
    return this.http.post<Post>(environment.newPost, fd, { headers }).pipe(
      map(res => {
        res.isMyLikedPost = this.common.IsLiked(res._id);
        res.isMySavedPost = this.common.isSaved(res._id);
        res.isMyCommentLoaded = false;
        return res;
      })
    )
  }

  updatePost(id: any, update: any) {
    const headers = this.common.headers;
    return this.http.post<Post>(environment.updatePost, { _id: id, changes: update }, { headers });
  }

  deletePost(id: string) {
    const headers = this.common.headers;
    const params = new HttpParams({
      fromString: `pId=${id}`
    });
    return this.http.delete(environment.deletePost, { headers, params });
  }

}
