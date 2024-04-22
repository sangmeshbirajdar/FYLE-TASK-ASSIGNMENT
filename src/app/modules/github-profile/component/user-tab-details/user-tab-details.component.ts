import { Component } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, finalize, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { CacheService } from 'src/app/core/utils/cache.service';
import { RepoDetails, startRepoDetails, tabTypes, UserRepo } from '../../modal/user-repo';
import { GithubProfileService } from '../../services/github-profile.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-user-tab-details',
  templateUrl: './user-tab-details.component.html',
  styleUrls: ['./user-tab-details.component.scss'],
})
export class UserTabDetailsComponent {
  user$: Observable<UserRepo | null>;
  repos: Array<RepoDetails> | null = [];
  isLoading$ : Observable<Boolean>;
  starredRepos$: Observable<startRepoDetails[]>;
  buttons : tabTypes[] = [
   
    {
      text: 'Repositories',
      value: null,
    },
    {
      text: 'Stars',
      value: null,
    },
    {
      text: 'Followers',
      value: null,
    },
    {
      text: 'Following',
      value: null,
    },
  ];
  selectedBtnIndex$ = new BehaviorSubject<number>(0);
  totalRecords: number = 0;
  username: string = '';
  
  constructor(
    private profileService: GithubProfileService,
    private cacheNetworkService: CacheService,
    private loadingService: LoadingService
  ) {
    this.isLoading$ = this.loadingService.isLoading;
    this.user$ = this.profileService.selectedUser$.pipe(
      switchMap((user) => {
        if (user) {
          this.toggleButton(0);
          this.repos = [];
          this.loadingService.show();
          return this.cacheNetworkService.get<UserRepo>(`/users/${user.login}`); // make API call using user id
        } else {
          return of(null); // return null if user is null
        }
      })
    );

    this.starredRepos$ = this.selectedBtnIndex$.pipe(
      distinctUntilChanged(),
      switchMap(index => {
        if (index === 1) {
          this.loadingService.show();
          return this.cacheNetworkService.get<startRepoDetails[]>(`/users/${this.username}/starred`).pipe(  
            finalize(() => {
              this.loadingService.hide();
            }),
            tap(repos => {
              this.buttons[1].value = repos.length;
            })
          );
        } else {
          return of([]);
        }
      })
    );
    
    this.user$
      .pipe(  
        switchMap((user) => {
          if (user) {
            this.totalRecords = user.public_repos;
            this.username = user.login;
            const { public_repos, followers, following } = user;

            this.buttons[0].value = public_repos;
            this.buttons[2].value = followers;
            this.buttons[3].value = following;
            this.profileService.userCompleteDetails$.next(user);
            return this.cacheNetworkService.get<RepoDetails[]>(
              `/users/${user.login}/repos` + '?per_page=10&page=1' 
            );
          } else {
            return of(null);
          }
        })
      )
      .subscribe((repos) => {
        this.repos = repos;
        this.loadingService.hide();
      });
  }

  ngOnInit() {}

   

  toggleButton(index: number) {
    this.selectedBtnIndex$.next(index);
  }

  paginate(event: any) {
    console.log(event);
    const page = event.first / event.rows + 1;
    const pageSize = event.rows;
    this.loadingService.show();
    this.cacheNetworkService.get<RepoDetails[]>(
      `/users/${this.username}/repos` + `?per_page=${event.rows}&page=${page}`
    ).subscribe((repos)=>{
      this.repos = repos;
      this.loadingService.hide()
    })
  }
  
  openLinkInNewTab(url: string) {
   window.open(url, '_blank');
  }
}
