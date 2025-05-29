import {Component, inject} from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    RouterLink,
    SubscriberCardComponent,
    JsonPipe,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService: ProfileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList(4);
  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },
  ]

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe());
  }
}
