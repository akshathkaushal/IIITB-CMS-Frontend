import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentPayload} from "./comment.payload";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8090/api/comments/by-post/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8090/api/comments/', commentPayload);
  }

  getAllCommentsByUser(rollNo: string) {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8090/api/comments/by-user/' + rollNo);
  }

}
