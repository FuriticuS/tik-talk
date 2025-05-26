import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post, PostCreateDto} from "../interfaces/post.interface";
import {switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _http = inject(HttpClient);
  private _baseApiUrl = 'https://icherniakov.ru/yt-course/';
  posts = signal<Post[]>([])

  createPost(payload: PostCreateDto) {
    return this._http.post<Post>(
      `${this._baseApiUrl}post/`,
      payload,
    ).pipe(
      switchMap( () => {
        return this.fetchPosts()
      })
    )
  }

  fetchPosts() {
    return this._http.get<Post[]>(`${this._baseApiUrl}post/`)
      .pipe(
        tap((response: Post[]) => {
          this.posts.set(response)
        })
      )
  }
}
