import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {PostModel} from "../post-model";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  posts: PostModel[] | any;

  constructor(private postService: PostService, private router: Router) {
    this.postService.getAllPosts().subscribe(post => {
      // this.posts = post;
      console.log("posts are ", this.posts)
    });
  }

  async ngOnInit(): Promise<void> {
    const res : any = await this.postService.getAllPosts().toPromise();
    this.posts = res;
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
