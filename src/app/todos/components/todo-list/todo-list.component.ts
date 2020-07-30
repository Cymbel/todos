import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Observable } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { Todo } from '../../models/todo';
import { MessageBusService } from 'src/app/services/message-bus.service';
import { Action } from 'src/app/services/action';
import { merge } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit {

// Avec la pipe Async
 todos$: Observable<Todo[]>;

// Avec Subscribe
// todos: Todo[];

displayedColumns = ['id', 'title', 'dueDate', 'completed', 'completedchk', 'actions'];

  constructor(private todo: TodosService, private busService: MessageBusService) { }

  // Avec la pipe Async
  ngOnInit() {

    const newTodos$ = this.busService.bus$.pipe(filter(action => action.type === 'NEW_TODO'));
    const loadTodos$ = this.busService.bus$.pipe(filter(action => action.type === 'LOAD_TODOS'));
    const deleteTodos$ = this.busService.bus$.pipe(
      filter(action => action.type === 'DELETE_TODOS'),
      switchMap(action => this.todo.delete(action.payload as Todo))
    );

    const obs$ = merge(newTodos$, loadTodos$, deleteTodos$);

    this.todos$ = obs$.pipe(switchMap(_ => this.todo.findAll()));

    // this.todos$ = this.todo.findAll();
    // this.busService.bus$.subscribe((action: Action) => this.todos$ = this.todo.findAll());
  }

  ngAfterViewInit(): void {
    const act = {type: 'LOAD_TODOS'};
    this.busService.dispatch(act);
  }

// Avec Subscribe
  // ngOnInit() {
  //   this.todo.findAll().subscribe((data) => {
  //     this.todos = data;
  //   });
  // }
  deleteTodo(todo: Todo) {
    const act = {type: 'DELETE_TODOS', payload: todo};
    this.busService.dispatch(act);

    // this.todos$ = this.todo.delete(todo).pipe(
      // switchMap(_ => this.todo.findAll())

  }
}
