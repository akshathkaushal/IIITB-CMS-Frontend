import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {VotePayload} from "./vote-button/vote-payload";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private httpClient: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> 
  {

    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
   console.log("vote type is ",votePayload);
   
    return this.httpClient.post('http://localhost:8080/api/votes/', votePayload,{headers:header,responseType:'json'});
  }
}
