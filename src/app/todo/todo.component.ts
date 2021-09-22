import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private todoService: TodoDataService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    if (this.id != -1) {
      this.todoService.retrieveTodo('in28Minutes', this.id).subscribe(
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
        this.todoService.createTodo('in28Minutes', this.todo).subscribe(
          response => {
            console.log(response);
            this.router.navigate(['todos']);
          }
        )
      }
      else {
        this.todoService.updateTodo('in28Minutes', this.id, this.todo).subscribe(
          response => {
            console.log(response);
            this.router.navigate(['todos']);
          }
        )
      }
    }
  }

}
