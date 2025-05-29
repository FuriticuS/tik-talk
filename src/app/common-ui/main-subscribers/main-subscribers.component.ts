import {Component, inject, input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {RouterLink} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";
import {ProfileInterface} from "../../data/interfaces/profile.interface";

@Component({
  selector: 'app-main-subscribers',
  standalone: true,
  imports: [
    AsyncPipe,
    ImgUrlPipe,
    RouterLink,
  ],
  templateUrl: './main-subscribers.component.html',
  styleUrl: './main-subscribers.component.scss'
})
export class MainSubscribersComponent {
  profile = input<ProfileInterface>();

  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList(6);
}
