import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';
import { MessageBusService } from 'src/app/services/message-bus.service';

@Component({
  selector: 'app-todo-reactiveform',
  templateUrl: './todo-reactiveform.component.html',
  styleUrls: ['./todo-reactiveform.component.css']
})
export class TodoReactiveformComponent implements OnInit {
  todo: Todo;
  constructor(private fb: FormBuilder, private todoService: TodosService, private busService: MessageBusService) { }

  todoForm = this.fb.group ({
    formTitle: ['', Validators.required],
    dueDate: [''],
    completed: [false],
  });

  ngOnInit() {
  }
  onSubmit() {
    const todoForm = this.todoForm.value;
    const dueDate = (new Date(todoForm.dueDate)).getTime();
    const todo: Todo = { title: todoForm.formTitle, dueDate, completed: todoForm.completed} as Todo;
    console.log(this.todoForm.value);

    this.todoService
      .save(todo)
      .subscribe(_ => {
        const act = { type: 'NEW_TODO'};
        this.busService.dispatch(act);
        this.todoForm.setValue({formTitle: '', dueDate: '', completed: false});
        this.todoForm.reset();
      });
  }
}
