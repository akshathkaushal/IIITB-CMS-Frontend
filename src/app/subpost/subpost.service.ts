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

    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    console.log("Fetching subposts using get method from service class");
    return this.httpClient.get<Array<SubpostModel>>('http://localhost:8080/api/subpost',{headers:header,responseType:'json'});
  }

  createSubpost(subpostmodel: SubpostModel) {

    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
    console.log("data received to service class is" , subpostmodel);
    return this.httpClient.post<any>('http://localhost:8080/api/subpost/post', subpostmodel,{headers:header,responseType:'json'});
  }


  deleteSubPost(name: any) 
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    console.log("name is " ,name);
    return this.httpClient.delete<any>(`http://localhost:8080/api/subpost/${name}`,{headers:header,responseType:'json'} )
  }
}
