import {Component, EventEmitter, HostBinding, inject, input, Output, Renderer2, signal} from '@angular/core';
import {AvatarCircleComponent} from "../../../common-ui/avatar-circle/avatar-circle.component";
import {ProfileService} from "../../../data/services/profile.service";
import {NgIf} from "@angular/common";
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {PostService} from "../../../data/services/post.service";
import {FormsModule} from "@angular/forms";
import {firstValueFrom} from "rxjs";
import {PostComment} from "../../../data/interfaces/post.interface";

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    NgIf,
    SvgIconComponent,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  private _r2 = inject(Renderer2)
  private _postService = inject(PostService);
  isCommentInput = input(false)
  postId = input<number>(0)
  profile = inject(ProfileService).me

  // при создании коммента емитим событие
  @Output() createComment = new EventEmitter<PostComment>();

  // отображение класса по требованию
  @HostBinding('class.comment') get isComment() {
    return this.isCommentInput()
  }

  postText = ''

  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;

    this._r2.setStyle( textArea, 'height','auto' );
    this._r2.setStyle( textArea, 'height', textArea.scrollHeight + 'px' );
  }

  onCreatePost() {
    if(!this.postText) return;

    //отображение комментов к посту
    if(this.isCommentInput()){
      firstValueFrom(this._postService.createComment({
        text: this.postText,
        postId: this.postId(),
        authorId: this.profile()!.id
      })).then(()=> {
        this.postText = '';
        this.createComment.emit();
      })

      return;
    }

    firstValueFrom(this._postService.createPost({
      title: 'Новый пост',
      content: this.postText,
      authorId: this.profile()!.id
    })).then(()=> {
      this.postText = '';
    })
  }
}
