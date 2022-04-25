import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubpostModel} from "./subpost-response";

@Injectable({
  providedIn: 'root'
})
export class SubpostService {

  constructor(private httpClient: HttpClient) { }

  getAllSubposts() : Observable<Array<SubpostModel>>{
    return this.httpClient.get<Array<SubpostModel>>('http://localhost:8090/api/subpost/');
  }

  createSubpost(subpostmodel: SubpostModel) : Observable<SubpostModel> {
    return this.httpClient.post<SubpostModel>('https://localhost:8090/api/subpost', subpostmodel);
  }
}
