import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api_url = 'http://localhost:3000'; // FOR LOCAL
  constructor(
    private http: HttpClient,
    // @Inject(ENVIRONMENTTOKEN) private env: IEnvironment, // FOR VARIABLE ENVS
  ) {}

  get<T>(path: string, routerParams?: Params): Observable<T> {
    let queryParams: Params = {};
    if (routerParams) {
      queryParams = this.setParameter(routerParams);
    }
    return this.http.get<T>(this.path(path), { params: queryParams });
  }

  put<T>(path: string, body: Record<string, any> = {}): Observable<any> {
    return this.http.put<T>(this.path(path), body);
  }

  patch<T>(path: string, body: Record<string, any> = {}): Observable<any> {
    return this.http.patch<T>(this.path(path), body);
  }

  post<T>(path: string, body: Record<string, any> = {}, options: any = {}): Observable<any> {
    return this.http.post<T>(this.path(path), body, options);
  }

  delete<T>(path: string): Observable<any> {
    return this.http.delete<T>(this.path(path));
  }

  private setParameter(routerParams: Params): HttpParams {
    let queryParams = new HttpParams();
    for (const key in routerParams) {
      if (key in routerParams && routerParams[key] != null) {
        queryParams = queryParams.set(key, routerParams[key]);
      }
    }
    return queryParams;
  }

  private path(path: string): string {
    return `${this.api_url}${path}`;
    // return `${this.env.api_url}${path}`;
  }
}
