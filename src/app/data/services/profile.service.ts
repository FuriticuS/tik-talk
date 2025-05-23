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
  filteredProfiles = signal<ProfileInterface[]>([]);

  // получить тестовые аккаунты
  getTestAccounts(): Observable<ProfileInterface[]> {
    return this.http.get<ProfileInterface[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  // получить свой аккаунт
  getMe(): Observable<ProfileInterface> {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res))
      );
  }

  // получить аккаунт пользователя
  getAccount(id: string): Observable<ProfileInterface> {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}account/${id}`);
  }

  // получить список подписчиков
  getSubscribersShortList(quantity: number): Observable<ProfileInterface[]> {
    return this.http.get<Pageble<ProfileInterface>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map((res: Pageble<ProfileInterface>) => {
          return res.items.slice(1, quantity);
        })
      );
  }

  // сохранить изменения в своем аккаунте
  pathProfile(profile: Partial<ProfileInterface>): Observable<ProfileInterface> {
    return this.http.patch<ProfileInterface>(`${this.baseApiUrl}account/me`, profile);
  }

  // загрузить аватарку
  uploadAvatar(file: File): Observable<ProfileInterface> {
    const fd = new FormData();
    fd.append('image', file);

    return this.http.post<ProfileInterface>(`${this.baseApiUrl}account/upload_image`, fd)
  }

  // фильтр по инпуту на странице поиска
  filterProfiles(params: Record<string, any>): Observable<Pageble<ProfileInterface>> {
    return this.http.get<Pageble<ProfileInterface>>(
      `${this.baseApiUrl}account/accounts`,
      {
        params
      }
    ).pipe(
      tap(res => this.filteredProfiles.set(res.items)),
    )
  }
}
