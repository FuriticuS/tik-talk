import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ProfileService} from "../../data/services/profile.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  profileService = inject(ProfileService);

  ngOnInit() {
    this.profileService.getMe().pipe(
      tap(val => {
        console.log(val)
      })
    ).subscribe();
  }
}
