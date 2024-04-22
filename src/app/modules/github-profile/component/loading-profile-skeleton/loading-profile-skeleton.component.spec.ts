import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

import { LoadingProfileSkeletonComponent } from './loading-profile-skeleton.component';

describe('LoadingProfileSkeletonComponent', () => {
  let component: LoadingProfileSkeletonComponent;
  let fixture: ComponentFixture<LoadingProfileSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingProfileSkeletonComponent ],
      imports : [CardModule , SkeletonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingProfileSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
