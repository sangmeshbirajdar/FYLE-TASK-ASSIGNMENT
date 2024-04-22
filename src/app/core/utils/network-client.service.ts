import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkClientService {

  apiUrl : String;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }

  
  get(url: string, config: { params?: any } = {}) {
    return this.httpClient.get<any>(this.apiUrl  + url, config);
  }

}
