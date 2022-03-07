import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAPIResponse } from '../models/IAPIResponse.model';
import { IListOf } from '../models/IListOf.model';
import { IUser } from '../models/IUser.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IListOf<IUser>> {
    return this.http.get<IListOf<IUser>>(`${this.baseUrl}users`);
  }

  getUser(id: number): Observable<IAPIResponse<IUser>> {
    return this.http.get<IAPIResponse<IUser>>(`${this.baseUrl}users/${id}`);
  }
}
