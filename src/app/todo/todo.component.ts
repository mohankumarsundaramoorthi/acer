import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TodoDataService } from '../service/todo-data.service';

import { Todo } from '../todos/todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id !: number;
  todo!: Todo;
  isInvalid: boolean = false;
  display = "none";
  userName : string = this.authService.getAuthenticatedUser()!;

  constructor(private todoService: TodoDataService,  private authService : BasicAuthenticationService, private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    if (this.id != -1) {
      this.todoService.retrieveTodo(this.userName, this.id).subscribe(
        response => this.todo = response
      )
    }
  }

  saveTodo(todoForm: any) {
    if (todoForm.invalid) {
      this.isInvalid = true;
    } else {
      this.isInvalid = false;
      if (this.id == -1) {
        this.todoService.createTodo(this.userName, this.todo).subscribe(
          response => {
            console.log(response);
            this.router.navigate(['todos']);
          }
        )
      }
      else {
        this.todoService.updateTodo(this.userName, this.id, this.todo).subscribe(
          response => {
            console.log(response);
            this.router.navigate(['todos']);
          }
        )
      }
    }
  }

}
