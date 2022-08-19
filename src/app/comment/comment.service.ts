import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentPayload} from "./comment.payload";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<any> {

    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )

    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-post/' + postId,{headers:header,responseType:'json'});
  }

  postComment(commentPayload: CommentPayload): Observable<any> {

    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.post<any>('http://localhost:8080/api/comments/', commentPayload,{headers:header,responseType:'json'});
  }

  getAllCommentsByUser(email: string) {

    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-user/' + email,{headers:header,responseType:'json'});
  }

}
