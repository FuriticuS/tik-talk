import {Component, input} from '@angular/core';
import {ProfileInterface} from "../../data/interfaces/profile.interface";
import {AvatarCircleComponent} from "../avatar-circle/avatar-circle.component";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    AvatarCircleComponent,
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<ProfileInterface>();
}
