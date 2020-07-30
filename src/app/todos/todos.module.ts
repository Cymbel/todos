import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoReactiveformComponent } from './components/todo-reactiveform/todo-reactiveform.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TodoListComponent, TodoFormComponent, TodoReactiveformComponent],
  exports: [TodoListComponent, TodoFormComponent, TodoReactiveformComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TodosModule { }
