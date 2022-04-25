import { Component, OnInit } from '@angular/core';
import {SubpostService} from "../../subpost/subpost.service";
import {SubpostModel} from "../../subpost/subpost-response";

@Component({
  selector: 'app-subpost-side-bar',
  templateUrl: './subpost-side-bar.component.html',
  styleUrls: ['./subpost-side-bar.component.css']
})
export class SubpostSideBarComponent implements OnInit {

  subposts: Array<SubpostModel> | any;
  displayViewAll: boolean | any;

  constructor(private subpostService: SubpostService) {
    this.subpostService.getAllSubposts().subscribe(data => {
      if(data.length > 4){
        this.subposts = data.splice(0,3);
        this.displayViewAll = true;
      } else {
        this.subposts = data;
      }
    });
  }

  ngOnInit(): void {
  }

}
