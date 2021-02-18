import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentSet } from 'src/app/model/comment-set';
import { CommonUtils } from 'src/app/utils/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private common: CommonUtils) { }

  getMyPostComments(postId: string): Observable<CommentSet[]> {
    const headers = this.common.headers;
    const params = new HttpParams({
      fromString: `pId=${postId}`
    });
    return this.http.get<CommentSet[]>(environment.getAllPostComments, { headers, params });
  }
}
