import { Component, OnInit } from '@angular/core';
import { PostModel } from 'app/shared/post-model';
import { PostService } from 'app/shared/post.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-stud-home-page',
  templateUrl: './stud-home-page.component.html',
  styleUrls: ['./stud-home-page.component.css']
})
export class StudHomePageComponent implements OnInit {

  constructor(private postService: PostService,private localStorage:LocalStorageService) { }

  posts: PostModel[] | any;
  name : string = ""
  async ngOnInit(): Promise<void> 
  {
    const res : any = await this.postService.getAllPosts().toPromise();
    this.posts = res;
    this.name = this.localStorage.retrieve('name');
    console.log(this.posts);
  }

}
