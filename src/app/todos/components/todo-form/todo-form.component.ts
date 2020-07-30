import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';
import { MessageBusService } from 'src/app/services/message-bus.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit, OnDestroy {

  todo: Todo;
  todoSubscribe: any;

  constructor(private todoService: TodosService, private busService: MessageBusService) {
    this.todo = { title: '', completed: false, dueDate: 0} as Todo;
   }

  ngOnInit() {
  }
  // onSubmit() {
  //   console.log(this.todo);
  //   this.todo.dueDate = (new Date(this.todo.dueDate)).getTime();
  //   this.todoService.save(this.todo).subscribe();
  // }
  // Utilisation d'un clone de l'objet
  onSubmit() {
    const tmp = {...this.todo};
    console.log(tmp);
    tmp.dueDate = (new Date(tmp.dueDate)).getTime();
    this.todoSubscribe = this.todoService
    .save(tmp)
    .subscribe(_ => {
      this.todo = {title: '', completed: false, dueDate: 0} as Todo;
      const act = {type: 'NEW_TODO' };
      this.busService.dispatch(act);
    });
  }
  ngOnDestroy(): void {
    this.todoSubscribe.unsubscribe();
  }
}
