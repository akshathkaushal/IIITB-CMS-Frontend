import { Component, OnInit } from '@angular/core';
import {SubpostModel} from "../../subpost/subpost-response";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {SubpostService} from "../../subpost/subpost.service";
import {CreatePostPayload} from "./create-post.payload";
import {throwError} from "rxjs";
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup | any;
  postPayload: CreatePostPayload;
  subposts: Array<SubpostModel> | any;
  navigate : string = "";

  constructor(private router: Router, private postService: PostService, private subpostService: SubpostService,
    private localStorage: LocalStorageService) {
    this.postPayload = {
      description: '',
      postName: '',
      subpostName: '',
      url: '',
      email: ''
    }
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      description: new FormControl('', Validators.required),
      postName: new FormControl('', Validators.required),
      subpostName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
    });
    this.subpostService.getAllSubposts().subscribe((data) => {
      this.subposts = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.subpostName = this.createPostForm.get('subpostName').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;
    this.postPayload.email = this.localStorage.retrieve('email');
    console.log(this.postPayload.subpostName);
    this.postService.createPost(this.postPayload).subscribe((data) => 
    {
      this.navigateTo();
      
    }, error => {
      console.log("Error creating post")
      throwError(error);
    })
  }



  discardPost() {
    this.navigateTo();
  }

  navigateTo()
  {
    var role = this.localStorage.retrieve("role")
    console.log("this is header ",role)
    if(role == 'student')
    {
      this.navigate = "studHome";
    }
    else if(role == 'committee')
    {
      this.navigate = "commHome";

    }
    else if (role == 'admin')
    {
      this.navigate = "adminHome";
    }
    this.router.navigateByUrl(role);
  }

}
