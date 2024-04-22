import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubProfileRoutingModule } from './github-profile-routing.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CardModule} from 'primeng/card';
import { GithubUserSearchComponent } from './component/github-user-search/github-user-search.component';
import { FormsModule } from '@angular/forms';
import { UserBasicDetailsComponent } from './component/user-basic-details/user-basic-details.component';
import { MainProfileComponent } from './component/main-profile/main-profile.component';
import { DropdownModule } from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {PaginatorModule} from 'primeng/paginator';
import { UserTabDetailsComponent } from './component/user-tab-details/user-tab-details.component';
import { SkeletonModule } from "primeng/skeleton";
import {ButtonModule} from 'primeng/button';
import { LoadingProfileSkeletonComponent } from './component/loading-profile-skeleton/loading-profile-skeleton.component';
import { LoadingGitTabSkeletonComponent } from './component/loading-git-tab-skeleton/loading-git-tab-skeleton.component';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [GithubUserSearchComponent, UserBasicDetailsComponent, MainProfileComponent, UserTabDetailsComponent, LoadingProfileSkeletonComponent, LoadingGitTabSkeletonComponent],
  imports: [
    CommonModule,
    AutoCompleteModule,
    CardModule,
    GithubProfileRoutingModule,
    FormsModule,
    DropdownModule,
    ToastModule,
    PaginatorModule,
    SkeletonModule,
    ButtonModule,
    NgOptimizedImage,
    
  ]
})
export class GithubProfileModule { }
