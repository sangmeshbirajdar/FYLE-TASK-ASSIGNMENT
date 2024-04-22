
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CacheService } from 'src/app/core/utils/cache.service';
import { GithubUserSearchComponent } from '../github-user-search/github-user-search.component';
import { UserBasicDetailsComponent } from '../user-basic-details/user-basic-details.component';
import { UserTabDetailsComponent } from '../user-tab-details/user-tab-details.component';

import { MainProfileComponent } from './main-profile.component';

describe('MainProfileComponent', () => {
  let component: MainProfileComponent;
  let fixture: ComponentFixture<MainProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileComponent , GithubUserSearchComponent , UserBasicDetailsComponent , UserTabDetailsComponent],
      providers: [CacheService],
      imports: [ HttpClientTestingModule , AutoCompleteModule, FormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
