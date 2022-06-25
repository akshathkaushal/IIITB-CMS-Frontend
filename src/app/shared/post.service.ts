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

    let token = localStorage.getItem("authenticationToken");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.get<Array<PostModel>>('http://localhost:8090/api/posts/',{headers:header,responseType:'json'});
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    let token = localStorage.getItem("authenticationToken");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.post('http://localhost:8090/api/posts/', postPayload,{headers:header,responseType:'json'});
  }

  getPost(id: number) : Observable<PostModel> {
    let token = localStorage.getItem("authenticationToken");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.get<PostModel>('http://localhost:8090/api/posts/'+id,{headers:header,responseType:'json'});
  }

  getAllPostsByUser(rollNo: string) : Observable<PostModel[]> {
    let token = localStorage.getItem("authenticationToken");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.get<PostModel[]>('http://localhost:8090/api/posts/by-user/' + rollNo,{headers:header,responseType:'json'});
  }

}
