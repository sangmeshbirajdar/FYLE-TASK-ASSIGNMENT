import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubProfileService } from '../../services/github-profile.service';

import { UserBasicDetailsComponent } from './user-basic-details.component';

describe('UserBasicDetailsComponent', () => {
  let component: UserBasicDetailsComponent;
  let fixture: ComponentFixture<UserBasicDetailsComponent>;
  let profileService: jasmine.SpyObj<GithubProfileService>;
  
  beforeEach(async () => {
    const profileServiceSpy = jasmine.createSpyObj('GithubProfileService', [
      'selectedUser$',
      'userCompleteDetails$',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ UserBasicDetailsComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
