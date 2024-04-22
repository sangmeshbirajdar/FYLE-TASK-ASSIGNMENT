import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { GithubUser } from '../modal/github-user';
import { UserRepo } from '../modal/user-repo';

@Injectable({
  providedIn: 'root'
})
export class GithubProfileService {

  selectedUser$ = new Subject<GithubUser | null>();
  userCompleteDetails$ = new Subject<UserRepo | null>();
  constructor() {
    
   }

  
}
