import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { GithubUser } from '../../modal/github-user';
import { UserRepo } from '../../modal/user-repo';
import { GithubProfileService } from '../../services/github-profile.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-user-basic-details',
  templateUrl: './user-basic-details.component.html',
  styleUrls: ['./user-basic-details.component.scss']
})
export class UserBasicDetailsComponent {
  user$: Observable<GithubUser | null> ;
  userRepoCompleteDetails$ : Observable<UserRepo | null> ;
  isLoading$ : Observable<Boolean>;
  constructor(private profileService: GithubProfileService , private loadingService : LoadingService) {
    this.user$ = this.profileService.selectedUser$;
    this.userRepoCompleteDetails$  = this.profileService.userCompleteDetails$;
    this.isLoading$ = this.loadingService.isLoading;
  }

  ngOnInit() {
    
  }

  openTwitter(userName : string) {
    console.log('twitter' + userName)
    window.open(`https://twitter.com/${userName}`, '_blank');
  }
}
