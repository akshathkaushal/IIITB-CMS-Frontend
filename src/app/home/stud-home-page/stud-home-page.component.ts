import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'app/shared/post-model';
import { PostService } from 'app/shared/post.service';
import { VotePayload } from 'app/shared/vote-button/vote-payload';
import { VoteType } from 'app/shared/vote-button/vote-type';
import { VoteService } from 'app/shared/vote.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-stud-home-page',
  templateUrl: './stud-home-page.component.html',
  styleUrls: ['./stud-home-page.component.css']
})
export class StudHomePageComponent implements OnInit 
{
  @Input() post: PostModel | any;

  votePayload: VotePayload;
  constructor(private postService: PostService,private localStorage:LocalStorageService,
    private voteService: VoteService,) { 
    this.votePayload = {
      voteType: undefined,
      postId: undefined,
      userEmail : ""
    }
  }


  navigate : string = "";
  role : string = "";
  posts: PostModel[] | any;
  name : string = ""
  post_id : number = -1;

  async ngOnInit(): Promise<void> 
  {
    const res : any = await this.postService.getAllPosts().toPromise();
    this.posts = res;
    this.name = this.localStorage.retrieve('name');
    this.role = this.localStorage.retrieve("role")
    console.log(res);
    this.post_id = res[0].postId;
    console.log(this.post_id);
    this.refreshRole();
  }

  refreshRole()
  {
    console.log("this is header ",this.role)
    if(this.role == 'student')
    {
      this.navigate = "studHome";
    }
    else if(this.role == 'committee')
    {
      this.navigate = "commHome";
    }
    else if (this.role == 'admin')
    {
      this.navigate = "adminHome";
    }
  }


  upvotePost(postId:any) {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote(postId);
  }

  private vote(postId:any) 
  {
    this.votePayload.postId = postId;
    this.votePayload.userEmail = this.localStorage.retrieve("email");
    console.log("vote type is ",this.votePayload);
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      alert("could not vote");
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }

  viewPost(postId:string)
  {
    this.localStorage.store('postId',postId);
    window.location.href = "view-post";
  }

  navigateTo(value:number)
  {
    if(value==1)
      window.location.href = this.navigate;
    else if(value==2)
      window.location.href = "create-post";

    
  }
}

  
