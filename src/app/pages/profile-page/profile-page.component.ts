import {Component, inject} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {ProfileService} from "../../data/services/profile.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {switchMap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {AsyncPipe} from "@angular/common";
import {SvgIconComponent} from "../../common-ui/svg-icon/svg-icon.component";
import {MainSubscribersComponent} from "../../common-ui/main-subscribers/main-subscribers.component";
import {PostFeedComponent} from "./post-feed/post-feed.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    MainSubscribersComponent,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute)

  me$ = toObservable(this.profileService.me)

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if(id === 'me') return this.me$

        return this.profileService.getAccount(id)
      })
    )
}
