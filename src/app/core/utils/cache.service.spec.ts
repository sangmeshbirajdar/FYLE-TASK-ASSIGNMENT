import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CacheService]
    });
    service = TestBed.inject(CacheService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return cached data if available', () => {
    const url = 'github.com';
    const cachedData = { name: 'ns' };
    service['cache'][url] = { data: cachedData, timestamp: Date.now() };

    service.get(url).subscribe(data => {
      expect(data).toEqual(cachedData);
    });

    const req = httpMock.expectNone(`${service['apiUrl']}${url}`);
  });

  it('should make a request and cache the response if data is not cached', () => {
    const url = 'github.com';
    const responseData = { baz: 'qux' };
    const expectedResponse = responseData;

    service.get(url).subscribe(data => {
      expect(data).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}${url}`);
    expect(req.request.method).toBe('GET');
    req.flush(responseData);

    expect(service['cache'][url]).toEqual({ data: expectedResponse, timestamp: jasmine.any(Number) });
  });

  it('should clear the cache after the cache duration has elapsed', (done) => {
    const url = 'github.com';
    const cachedData = { user: 'ns' };
    const newCacheDuration = 10; 
    service['CACHE_DURATION_MS'] = newCacheDuration;
    service['cache'][url] = { data: cachedData, timestamp: Date.now() - (newCacheDuration + 1) };

    service.get(url).subscribe(data => {
      expect(data).not.toEqual(cachedData);
      done();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}${url}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
