import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  apiUrl : String;
  private cache: { [url: string]: { data: any, timestamp: number } } = {};
  private CACHE_DURATION_MS = 60 * 60 * 1000; 

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.autoClearCache(this.CACHE_DURATION_MS);
   }

  private isCacheValid(url: string): boolean {
    const cacheEntry = this.cache[url];
    return cacheEntry && Date.now() - cacheEntry.timestamp <= this.CACHE_DURATION_MS;
  }

  get<T>(url: string): Observable<T> {
    if (url in this.cache && this.isCacheValid(url)) {
      return of(this.cache[url].data);
    } else {
      const request = this.http.get<T>(this.apiUrl  + url).pipe(
        map((response) => {
          const data = response as T;
          this.cache[url] = { data, timestamp: Date.now() };
          return data;
        })
      );
      return request;
    }
  }

 

  autoClearCache(durationMs: number): void {
    timer(0, durationMs).pipe(
      switchMap(() => {
        const now = Date.now();
        Object.keys(this.cache).forEach((url) => {
          if (now - this.cache[url].timestamp > this.CACHE_DURATION_MS) {
            delete this.cache[url];
          }
        });
        return of(null);
      })
    ).subscribe();
  }
}
