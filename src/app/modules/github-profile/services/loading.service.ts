import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading: Observable<boolean> = this.loading.asObservable();

  constructor() { }

  public show(): void {
    this.loading.next(true);
  }
  
  public hide(): void {
    this.loading.next(false);
  }
  
}
