import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { of } from 'rxjs';
import { CacheService } from 'src/app/core/utils/cache.service';
import { GithubUser } from '../../modal/github-user';
import { GithubProfileService } from '../../services/github-profile.service';

import { GithubUserSearchComponent } from './github-user-search.component';

describe('GithubUserSearchComponent', () => {
  let component: GithubUserSearchComponent;
  let fixture: ComponentFixture<GithubUserSearchComponent>;
  let cacheNetworkCall: CacheService;
  let profileService: GithubProfileService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubUserSearchComponent ],
      imports : [HttpClientTestingModule , AutoCompleteModule , FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  

 

});
