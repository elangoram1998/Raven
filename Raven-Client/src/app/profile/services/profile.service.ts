import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
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

  changeProfilePic(fd: FormData): Observable<User> {
    const headers = this.common.headers;
    return this.http.post<User>(environment.changeProfilePic, fd, { headers });
  }
  removeProfilePic(): Observable<User> {
    const headers = this.common.headers;
    return this.http.post<User>(environment.removeProfilePic, {}, { headers });
  }

  editProfile(formValue: any) {
    const headers = this.common.headers;
    return this.http.put(environment.editProfile, formValue, { headers });
  }

  changePassword(password: string): Observable<boolean> {
    const headers = this.common.headers;
    return this.http.put<boolean>(environment.changePassword, { password }, { headers });
  }

  getUsersData(users: string[]): Observable<any[]> {
    const headers = this.common.headers;
    return this.http.post<any[]>(environment.getUsersData, { users }, { headers });
  }

  updateFollowData(id: string) {
    const headers = this.common.headers;
    return this.http.put(environment.updateFollowings, { id }, { headers });
  }

  updateChatRoom(userId: string) {
    const headers = this.common.headers;
    return this.http.put(environment.updateChatRoom, { userId }, { headers });
  }
}
