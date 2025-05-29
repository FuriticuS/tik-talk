import {Component, inject, WritableSignal} from '@angular/core';
import {PostInputComponent} from "../post-input/post-input.component";
import {PostComponent} from "../post/post.component";
import {PostService} from "../../../data/services/post.service";
import {firstValueFrom} from "rxjs";
import {Post} from "../../../data/interfaces/post.interface";

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {
  postService = inject(PostService);
  feed = this.postService.posts;

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }
}
