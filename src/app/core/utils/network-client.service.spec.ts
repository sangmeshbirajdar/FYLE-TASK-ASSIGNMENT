import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';
import { NetworkClientService } from './network-client.service';

describe('NetworkClientService', () => {
  let service: NetworkClientService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers : [NetworkClientService]
    });
    service = TestBed.inject(NetworkClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should make a GET request to the correct URL', () => {
    const url = '/user';
    const params = { username: 'hello' };
    service.get(url, { params }).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${service.apiUrl}${url}?username=hello`);
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush({ data: 'test' });
  });


});
