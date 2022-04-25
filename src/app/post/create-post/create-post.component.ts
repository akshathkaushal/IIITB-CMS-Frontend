import { Component, OnInit } from '@angular/core';
import {SubpostModel} from "../../subpost/subpost-response";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {SubpostService} from "../../subpost/subpost.service";
import {CreatePostPayload} from "./create-post.payload";
import {throwError} from "rxjs";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup | any;
  postPayload: CreatePostPayload;
  subposts: Array<SubpostModel> | any;

  constructor(private router: Router, private postService: PostService, private subpostService: SubpostService) {
    this.postPayload = {
      description: '',
      postName: '',
      subpostName: '',
      url: ''
    }
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      description: new FormControl('', Validators.required),
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
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

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }



  discardPost() {
    this.router.navigateByUrl('/');
  }

}
