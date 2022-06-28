import { Component, OnInit } from '@angular/core';
import {PostModel} from "../shared/post-model";
import {PostService} from "../shared/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<PostModel> = [];

  constructor(private postService: PostService) {
  }


  async ngOnInit(): Promise<void> 
  {
    const res : any = await this.postService.getAllPosts().toPromise();
    this.posts = res;
  }

}
