import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileInterface} from "../interfaces/profile.interface";
import {map, Observable, tap} from "rxjs";
import {Pageble} from "../interfaces/pageble";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  me = signal<ProfileInterface | null>(null);

  getTestAccounts(): Observable<ProfileInterface[]> {
    return this.http.get<ProfileInterface[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe(): Observable<ProfileInterface> {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res))
      );
  }

  getSubscribersShortList(): Observable<ProfileInterface[]> {
    return this.http.get<Pageble<ProfileInterface>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map((res: Pageble<ProfileInterface>) => {
          return res.items.slice(1, 4);
        })
      );
  }
}
