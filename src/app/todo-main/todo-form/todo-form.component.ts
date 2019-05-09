import { Component } from '@angular/core';
import {HTTPTodoServiceService} from '../../shared/services/HTTP-todo-service.service';
import {ObjectTypes} from '../../shared/model/ObjectTypes';
import {EventService} from '../../shared/services/_event.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.styl']
})
export class TodoFormComponent {

  newTodo: ObjectTypes = {
    id: null,
    title: '',
    completed: false,
    body: ''
  };

  constructor(
    private todoService: HTTPTodoServiceService,
    private eventService: EventService
  ) {}

  createTasks() {
    // Старое подключение
    // this.todoService.CreateTodo(this.newTodoTitle, this.newTodoBody);


    // Новое подключение
    this.todoService.addHero( this.newTodo ).subscribe();
    // событие для клиента, былбы норм HTTP етого не нужно было делать.
    // если копирование не сделать, то передадим не Обьект, А ссылку на етот обьект.
    const copy = Object.assign({}, this.newTodo); // поверхностная копия обьекта (1 уровень вложенности)
    this.eventService.setEvent(copy); // передаем обьект через собственный сервисСобытий
  }
}
