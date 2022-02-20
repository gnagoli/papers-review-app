import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  baseUrl = `${environment.apiUrl}`

  constructor(private httpClient: HttpClient) { }


  public login(data: { email: string, password: string }): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`,
      data,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      }
    );
  }

  public register(body: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, body);
  }

  public findArticles() {
    return this.httpClient.get(`${this.baseUrl}/papers`);
  }

  public savePaper(data: any) {
    return this.httpClient.post(`${this.baseUrl}/papers`, data);

  }
  public getArticle(id: string) {
    return this.httpClient.get(`${this.baseUrl}/papers/${id}`);
  }

  public addReviewer(data: { paper: any; reviewer: any; }) {

    return this.httpClient.post(`${this.baseUrl}/review-requests`, data);

  }


}
