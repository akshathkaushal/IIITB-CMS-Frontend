import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubpostModel } from 'app/subpost/subpost-response';
import { SubpostService } from 'app/subpost/subpost.service';
import { AdminOpsService } from '../admin-ops.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  constructor(private adminOpsService: AdminOpsService, private subpostService: SubpostService) { }

  subpost:SubpostModel = new SubpostModel;
  subposts:SubpostModel[] = [];
  addTopicFormDisplay:boolean = false;
  dataLoaded:boolean = false;

  async ngOnInit(): Promise<void> 
  {
    const data : any = await this.subpostService.getAllSubposts().toPromise();
    console.log("subposts are ", data);
    this.subposts = data;
    console.log("this. subposts after copying are ",this.subposts);
    this.dataLoaded = true;
  }

  public addTopic()
  {
    console.log("addTopic called!")
    this.addTopicFormDisplay = true;
  }


  public async onAdd(topicAdd:NgForm)
  {
    console.log("Form data is ",this.subpost);
    const res : any = await this.subpostService.createSubpost(this.subpost).toPromise();
    this.addTopicFormDisplay = false;
    console.log("topic added");
    this.subpost.description = "";
    this.subpost.name = "";
    this.ngOnInit();
  }

  async deleteUser(subpost:SubpostModel)
  {
    console.log(subpost.name);
    const res : any = await this.subpostService.deleteSubPost(subpost.name).toPromise();
    console.log("deleted topic successfully" , res);
    this.ngOnInit();
  }

  public logOutAdmin()
  {
    localStorage.clear();
    window.location.href = "login";
  }

}
