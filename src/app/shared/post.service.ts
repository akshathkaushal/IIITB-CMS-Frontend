import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "./post-model";
import {CreatePostPayload} from "../post/create-post/create-post.payload";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {

    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/posts/',{headers:header,responseType:'json'});
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    console.log("post is ",postPayload);
    return this.httpClient.post('http://localhost:8080/api/posts/', postPayload,{headers:header,responseType:'json'});
  }

  getPost(id: number) : Observable<PostModel> {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.get<PostModel>('http://localhost:8080/api/posts/'+id,{headers:header,responseType:'json'});
  }

  getAllPostsByUser(email: string) : Observable<PostModel[]> {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.get<PostModel[]>('http://localhost:8080/api/posts/by-user/' + email,{headers:header,responseType:'json'});
  }

}
