import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentModel } from 'src/app/model/comment';
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
    return this.http.get<CommentSet[]>(environment.getAllPostComments, { headers, params }).pipe(
      map(res => {
        res.forEach((commentSet) => {
          commentSet.comment.isMyLikedComment = this.common.isLikedComment(commentSet.comment._id);
          commentSet.replys?.forEach((replys) => {
            replys.isMyLikedComment = this.common.isLikedComment(replys._id);
          });
        });
        return res;
      })
    )
  }

  addComment(postId: string, text: string): Observable<CommentSet> {
    const headers = this.common.headers;
    return this.http.post<CommentSet>(environment.addComment, { postId, text }, { headers })
      .pipe(
        map(res => {
          res.comment.isMyLikedComment = this.common.isLikedComment(res.comment._id);
          return res;
        })
      )
  }

  addReply(postId: string, commentSetId: string, text: string): Observable<CommentModel> {
    const headers = this.common.headers;
    console.log(text)
    return this.http.post<CommentModel>(environment.addreply, { postId, commentSetId, text }, { headers })
      .pipe(
        map(res => {
          res.isMyLikedComment = this.common.isLikedComment(res._id);
          return res;
        })
      )
  }

  likeComment(commentId: string, totalLikes: number) {
    const headers = this.common.headers;
    return this.http.post(environment.likeComment, { commentId, totalLikes }, { headers });
  }
}
