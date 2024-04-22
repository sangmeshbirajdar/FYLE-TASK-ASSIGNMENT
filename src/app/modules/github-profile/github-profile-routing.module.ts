import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubUserSearchComponent } from './component/github-user-search/github-user-search.component';
import { MainProfileComponent } from './component/main-profile/main-profile.component';

const routes: Routes = [
  {
    path: '',
    component : MainProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubProfileRoutingModule { }
