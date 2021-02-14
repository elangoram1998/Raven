import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getMyFeed(): Observable<Post[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      "authorization": "Bearer " + token
    })
    return this.http.get<Post[]>(environment.myFeed, { headers })
  }

}
