import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

import { LoadingGitTabSkeletonComponent } from './loading-git-tab-skeleton.component';

describe('LoadingGitTabSkeletonComponent', () => {
  let component: LoadingGitTabSkeletonComponent;
  let fixture: ComponentFixture<LoadingGitTabSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingGitTabSkeletonComponent ],
      imports : [CardModule , SkeletonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingGitTabSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
