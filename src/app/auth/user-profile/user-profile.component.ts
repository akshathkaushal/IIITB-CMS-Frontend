import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../shared/post-model";
import {CommentPayload} from "../../comment/comment.payload";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {CommentService} from "../../comment/comment.service";
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // rollNo: string;
  name:string;
  email : string;
  posts: PostModel[] = [] 
  comments: CommentPayload[] | any;
  postLength: number | any;
  commentLength: number | any;
  dataLoaded: boolean =false;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private localStorage: LocalStorageService,
              private commentService: CommentService) {
    // this.rollNo = this.activatedRoute.snapshot.params['rollNo'];
    this.email = this.localStorage.retrieve('email');
    this.name = this.localStorage.retrieve('name');
    
    this.commentService.getAllCommentsByUser(this.email).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  async ngOnInit(): Promise<void> {

    const res : any = await this.postService.getAllPostsByUser(this.email).toPromise();
    
      this.posts = res;
      this.postLength = res.length;
      console.log("user data is ", this.posts);
      this.dataLoaded = true;
  }

  viewPost(postId:string)
  {
    this.localStorage.store('postId',postId);
    window.location.href = "view-post";
  }

}
