import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CacheService } from 'src/app/core/utils/cache.service';
import { RepoDetails, startRepoDetails, UserRepo } from '../../modal/user-repo';
import { GithubProfileService } from '../../services/github-profile.service';
import { LoadingService } from '../../services/loading.service';

import { UserTabDetailsComponent } from './user-tab-details.component';

describe('UserTabDetailsComponent', () => {
  let component: UserTabDetailsComponent;
  let fixture: ComponentFixture<UserTabDetailsComponent>;
  let profileService: jasmine.SpyObj<GithubProfileService>;
  let cacheNetworkService: CacheService;
  let loadingService: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTabDetailsComponent ],
      providers: [ CacheService ],
      imports: [ HttpClientModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTabDetailsComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(GithubProfileService);
    cacheNetworkService = TestBed.inject(CacheService);
    loadingService = TestBed.inject(LoadingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user$', () => {
    const mockUser = { login: 'ns-user' } as UserRepo;
    spyOn(profileService.selectedUser$, 'pipe').and.returnValue(of(mockUser));
    spyOn(cacheNetworkService, 'get').and.returnValue(of(mockUser));
    component.ngOnInit();
    expect(component.user$).toBeDefined();
    component.user$.subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
  });
  
  it('should update selectedBtnIndex when toggleButton is called', () => {
    const spy = spyOn(component.selectedBtnIndex$, 'next');
    component.toggleButton(2);
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('should open link in new tab when openLinkInNewTab is called', () => {
    spyOn(window, 'open');
    component.openLinkInNewTab('http://xyz.com');
    expect(window.open).toHaveBeenCalledWith('http://xyz.com', '_blank');
  });

  it('should initialize starredRepos$', () => {
    const mockUser = { login: 'ns-user' } as UserRepo;
    const mockRepos = [{ login: 'ns-user' }, { login: 'ns-user' }] as unknown as startRepoDetails[];
    component.username = mockUser.login;
    component.selectedBtnIndex$.next(1);
    spyOn(cacheNetworkService, 'get').and.returnValue(of(mockRepos));
    spyOn(loadingService, 'show').and.callThrough();
    spyOn(loadingService, 'hide').and.callThrough();
    component.ngOnInit();
    expect(component.starredRepos$).toBeDefined();
    component.starredRepos$.subscribe((repos) => {
      expect(repos).toEqual(mockRepos);
    });
  });

  it('should call cacheNetworkService.get with correct parameters when paginate is called', () => {
    const repoDetails = { login: 'ns-user' } as unknown as RepoDetails;
    const cacheNetworkServiceSpy = spyOn(cacheNetworkService, 'get').and.returnValue(of(repoDetails));
    const event = { first: 0, rows: 10 };
    component.username = 'ns';
    component.paginate(event);
    expect(cacheNetworkServiceSpy).toHaveBeenCalledWith(`/users/${component.username}/repos?per_page=${event.rows}&page=${event.first / event.rows + 1}`);
  });

  it('should call loadingService.show when paginate is called', () => {
    const event = { first: 0, rows: 10 };
    spyOn(loadingService, 'show');
    component.paginate(event);
    expect(loadingService.show).toHaveBeenCalled();
  });

  it('should call loadingService.hide when cacheNetworkService.get completes in paginate method', () => {
    const event = { first: 0, rows: 10 };
    spyOn(cacheNetworkService, 'get').and.returnValue(of([]));
    spyOn(loadingService, 'hide')
    component.paginate(event);
    expect(loadingService.hide).toHaveBeenCalled();
  });

});
