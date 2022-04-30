import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "./post-model";
import {CreatePostPayload} from "../post/create-post/create-post.payload";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>('http://localhost:8090/api/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8090/api/posts/', postPayload);
  }

  getPost(id: number) : Observable<PostModel> {
    return this.httpClient.get<PostModel>('http://localhost:8090/api/posts/'+id);
  }

  getAllPostsByUser(rollNo: string) : Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>('http://localhost:8090/api/posts/by-user/' + rollNo);
  }

}
