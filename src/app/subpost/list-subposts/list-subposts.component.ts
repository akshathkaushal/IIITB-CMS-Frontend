import { Component, OnInit } from '@angular/core';
import {SubpostModel} from "../subpost-response";
import {SubpostService} from "../subpost.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-list-subposts',
  templateUrl: './list-subposts.component.html',
  styleUrls: ['./list-subposts.component.css']
})
export class ListSubpostsComponent implements OnInit {

  subposts: Array<SubpostModel> | any;

  constructor(private subpostService: SubpostService) { }

  ngOnInit(): void {
    this.subpostService.getAllSubposts().subscribe(data => {
      this.subposts = data;
    }, error => {
      throwError(error);
    });
  }

}
