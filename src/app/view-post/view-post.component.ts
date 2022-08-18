import { Component, OnInit } from '@angular/core';
import { CommentPayload } from 'app/comment/comment.payload';
import { PostModel } from 'app/shared/post-model';
import { PostService } from 'app/shared/post.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  constructor(private postService: PostService,private localStorage: LocalStorageService) { }
  post: PostModel | any;
  comment: CommentPayload | any;
  likes:number = -1;


  ngOnInit(): void 
  {
    var postId = this.localStorage.retrieve('postId');
    this.postService.getPost(postId).subscribe(
      (data:any) => 
      {
        console.log("data obtained i.e. post is ",data);
        this.post = data;
      },
      (error:any) => 
      {
        alert("could not fetch the post details ");
      }
    )
  }

  onSubmitComment(comment:CommentPayload)
  {
    // var email = this.localStorage.retrieve('email');
    // var postId = this.localStorage.retrieve('postId');

    // comment.email = email;
    // comment.postId = postId;

    
  }

}
