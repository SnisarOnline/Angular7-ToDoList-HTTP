import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {TodoChildRouting} from './todo-main.routing';  // регистрация роутера для страниц
import {SharedModule} from '../shared/shared.module'; // регистрация модуля для обших файлов (модульное подключение)
import { TodoMainComponent } from './todo-main.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailedComponent } from './todo-list/todo-detailed/todo-detailed.component';

@NgModule({
  declarations: [
    TodoMainComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoDetailedComponent,
  ],
  imports: [
    CommonModule,      // подключаем 1 раз ток в дочерном
    FormsModule,       // Декларируем [(ngModel)]
    TodoChildRouting,  // регистрация роутера для страниц
    SharedModule,      // регистрация модуля для обших файлов (модульное подключение)
  ],
  providers: []
})
export class TodoMainModule { }
