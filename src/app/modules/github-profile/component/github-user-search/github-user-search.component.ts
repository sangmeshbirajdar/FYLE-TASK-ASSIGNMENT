import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Event } from '@angular/router';
import { from, fromEvent, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { CacheService } from 'src/app/core/utils/cache.service';
import { NetworkClientService } from 'src/app/core/utils/network-client.service';
import { GithubUser } from '../../modal/github-user';
import { GithubProfileService } from '../../services/github-profile.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-github-user-search',
  templateUrl: './github-user-search.component.html',
  styleUrls: ['./github-user-search.component.scss'],
})
export class GithubUserSearchComponent {
  searchResults: GithubUser[] = [];
  selectedUser: GithubUser | null = null;
  search$ = new Subject<string>();

  constructor(
    private cacheNetworkCall: CacheService,
    private profileService: GithubProfileService
  ) {}

  ngOnInit() {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: string) => this.getUsers(query))
      )
      .subscribe((users: GithubUser[]) => {
        this.searchResults = users;
      });
  }

  getUsers(query: string): Observable<GithubUser[]> {
    const url = `/search/users?q=${query}`;
    return this.cacheNetworkCall
      .get<any>(url)
      .pipe(map((response) => response.items));
  }

  showUserOtherDetails() {
    this.profileService.selectedUser$.next(this.selectedUser);
  }
}
