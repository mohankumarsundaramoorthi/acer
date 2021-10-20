import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { Todo } from '../todos/todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  // testStrResponse() {
  //   this.http.post(`${API_URL}/con/str/test`, {username:'user'},{ responseType: 'text' }).subscribe(response => {
  //     console.log(`Response from spring is - ${response}`);
  //   })    
  // }

  retrieveAllTodos(username: string) {
    return this.http.get<Todo[]>(`${API_URL}/con/users/${username}/todos`);
  }

  deleteTodo(username: string, id: number) {
    return this.http.delete(`${API_URL}/con/users/${username}/todos/${id}`)
  }

  retrieveTodo(username: string, id: number) {
    return this.http.get<Todo>(`${API_URL}/con/users/${username}/todos/${id}`)
  }

  updateTodo(username: string, id: number, todo: Todo) {
    return this.http.put<Todo>(
      `${API_URL}/con/users/${username}/todos/${id}`,
      todo);
  }

  createTodo(username: string, todo: Todo) {
    return this.http.post(
      `${API_URL}/con/users/${username}/todos/`,
      todo);
  }

}
