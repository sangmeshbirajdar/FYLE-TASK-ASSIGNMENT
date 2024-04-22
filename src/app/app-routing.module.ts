import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'github_profile',
    pathMatch: 'full',
  },
  {
    path: 'github_profile',
    loadChildren: () => import('./modules/github-profile/github-profile.module').then((m) => m.GithubProfileModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
