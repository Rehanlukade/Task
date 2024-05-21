import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  baseUrl: string = 'https://api.github.com/users';
  page: number = 1;
  perPage: number = 10;

  constructor(private http: HttpClient) { }

  getUserProfile(username: string): Observable<any> {
    const url = `${this.baseUrl}/${username}`;

    return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(`Error fetching user profile for ${username}:`, error);
        return throwError(`Could not fetch user profile for ${username}`);
      })
    );
  }

  getRepositories(username: string): Observable<any> {
    const url = `${this.baseUrl}/${username}/repos?page=${this.page}&per_page=${this.perPage}`;

    return this.http.get<any[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(`Error fetching repositories for ${username}:`, error);
        return throwError(`Could not fetch repositories for ${username}`);
      })
    );
  }

  setPage(page: number): void {
    this.page = page;
  }

  setPerPage(perPage: number): void {
    this.perPage = perPage;
  }
}
