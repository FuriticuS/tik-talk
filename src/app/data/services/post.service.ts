import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CommentCreateDto, Post, PostComment, PostCreateDto} from "../interfaces/post.interface";
import {map, Observable, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _http = inject(HttpClient);
  private _baseApiUrl = 'https://icherniakov.ru/yt-course/';
  posts = signal<Post[]>([])

  // запрос на созданный пост
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

  // показать все посты
  fetchPosts(): Observable<Post[]> {
    return this._http.get<Post[]>(`${this._baseApiUrl}post/`)
      .pipe(
        tap((response: Post[]) => {
          this.posts.set(response)
        })
      )
  }

  // запрос на созданный комментарий к посту
  createComment(payload: CommentCreateDto): Observable<PostComment> {
    return this._http.post<PostComment>(`${this._baseApiUrl}comment/`, payload)
  }

  // запрос на отображение коммента сразу после отправки
  getCommentsByPostId(postId: number): Observable<PostComment[]> {
    return this._http.get<Post>(`${this._baseApiUrl}post/${postId}`)
      .pipe(
        map((response: Post) => response.comments),
      )
  }
}
