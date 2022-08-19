import { Component, OnInit } from '@angular/core';
import { CommentPayload } from 'app/comment/comment.payload';
import { CommentService } from 'app/comment/comment.service';
import { PostModel } from 'app/shared/post-model';
import { PostService } from 'app/shared/post.service';
import { VotePayload } from 'app/shared/vote-button/vote-payload';
import { VoteType } from 'app/shared/vote-button/vote-type';
import { VoteService } from 'app/shared/vote.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  constructor(private postService: PostService,private localStorage: LocalStorageService,
    private commentService: CommentService,private voteService: VoteService) 
    { 
      this.votePayload = {
        voteType: undefined,
        postId: undefined,
        userEmail: ""
      }
    }

  post: PostModel | any;
  comment: CommentPayload = new CommentPayload();
  likes:number = -1;
  comments: CommentPayload[] = [];

  postLoaded : boolean = false;
  numberOfComments: number = 0;
  
  votePayload: VotePayload;

  async ngOnInit(): Promise<void> 
  {
    var postId = this.localStorage.retrieve('postId');
    const data : any = await this.postService.getPost(postId).toPromise();
    console.log("data obtained i.e. post is ",data);

    this.post = data;

    this.getCommentsForPost();

    this.postLoaded = true;

    // this.postService.getPost(postId).subscribe(
    //   (data:any) => 
    //   {
    //     console.log("data obtained i.e. post is ",data);
    //     this.post = data;
    //     this.postLoaded = true;
    //   },
    //   (error:any) => 
    //   {
    //     alert("could not fetch the post details ");
    //   }
    // )
  }

  async onSubmitComment(comment:CommentPayload)
  {
    console.log(comment);
    var email = this.localStorage.retrieve('email');
    var postId = this.localStorage.retrieve('postId');

    comment.email = email;
    comment.postId = postId;
    const res : any = await this.commentService.postComment(comment).toPromise();
    comment.text = "";
    this.ngOnInit();
    
  }

  private async getCommentsForPost() 
  {
    var postId = this.localStorage.retrieve('postId');
    const res : any = await this.commentService.getAllCommentsForPost(postId).toPromise();
    this.comments = res;
    console.log(this.comments);
    this.numberOfComments = this.comments.length;

    // this.commentService.getAllCommentsForPost(postId).subscribe(data => {
    //   this.comments = data;
    //   console.log("comments obtained are " ,this.comments);
    // }, error => {
    //   console.log(error)
    // });
  }

  upvotePost(postId:any) 
  {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote(postId);
  }

  downvotePost(postId:any) 
  {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote(postId);
  }

  private vote(postId:any) 
  {
    this.votePayload.postId = postId;
    this.votePayload.userEmail = this.localStorage.retrieve("email");
    this.votePayload.postId = this.localStorage.retrieve("postid");

    console.log("vote type is ",this.votePayload);
    console.log("post id is ",postId);
    this.voteService.vote(this.votePayload).subscribe(() => 
    {
      // this.updateVoteDetails();
      this.ngOnInit();
    }, 
    error => 
    {
      alert("could not vote");
    });
  }

}
