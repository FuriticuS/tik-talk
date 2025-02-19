import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileInterface} from "../interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  http: HttpClient = inject(HttpClient);

  getTestAccounts() {
    return this.http.get<ProfileInterface[]>(`${this.baseApiUrl}account/test_accounts`);
  }
}
