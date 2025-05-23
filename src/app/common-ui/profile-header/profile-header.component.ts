import {Component, input} from '@angular/core';
import {ProfileInterface} from "../../data/interfaces/profile.interface";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<ProfileInterface>();
}
