import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.url_todos);
  }
  delete(todo: Todo): Observable<any> {
    const urlDelete = `${environment.url_todos}/${todo.id}`;
    return this.http.delete(urlDelete);
  }
  save(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(environment.url_todos, todo, this.httpOptions);
  }
}
