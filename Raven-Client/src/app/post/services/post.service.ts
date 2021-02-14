import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<Post[]>(environment.myFeed, { headers })
  }

}
