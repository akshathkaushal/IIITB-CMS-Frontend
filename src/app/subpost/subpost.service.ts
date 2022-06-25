import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubpostModel} from "./subpost-response";

@Injectable({
  providedIn: 'root'
})
export class SubpostService {

  constructor(private httpClient: HttpClient) { }

  getAllSubposts() : Observable<Array<SubpostModel>>{

    let token = localStorage.getItem("authenticationToken");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.get<Array<SubpostModel>>('http://localhost:8090/api/subpost',{headers:header,responseType:'json'});
  }

  createSubpost(subpostmodel: SubpostModel) : Observable<SubpostModel> {

    let token = localStorage.getItem("authenticationToken");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    return this.httpClient.post<SubpostModel>('http://localhost:8090/api/subpost', subpostmodel,{headers:header,responseType:'json'});
  }
}
