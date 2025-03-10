import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "../../common-ui/profile-card/profile-card.component";
import {ProfileInterface} from "../../data/interfaces/profile.interface";
import {ProfileService} from "../../data/services/profile.service";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profiles: ProfileInterface[] = [];
  profileService = inject(ProfileService);

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(account => {
        this.profiles = account;
      })
  }

}
