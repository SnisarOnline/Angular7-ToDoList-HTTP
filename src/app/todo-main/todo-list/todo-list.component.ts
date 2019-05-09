import {Component, OnInit} from '@angular/core';
import {ObjectTypes} from '../../shared/model/ObjectTypes';
import {HTTPTodoServiceService} from '../../shared/services/HTTP-todo-service.service';
import {EventService} from '../../shared/services/_event.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.styl']
})
export class TodoListComponent implements OnInit {

  ObjectTodos: ObjectTypes[];

  constructor(
    private todoService: HTTPTodoServiceService,
    private eventService: EventService
  ) {
    this.ObjectTodos = [];
  }

  // метод который ангуляр вызовет при загрузке компонента https://angular.io/guide/lifecycle-hooks
  ngOnInit() {
    // Старое подключение
    // this.ObjectTodos = this.todoService.getHeroes();

    // Новое подключение
    this.todoService.getHeroes()
      .subscribe(myObserver => this.ObjectTodos = myObserver );
    // Костыль из-за неполноценной работы HTTP, пример работы с "eventService"
    this.eventService.getEvent().subscribe(event => this.add(event) );
  }

  /**
   * Обработка клика по чекбоксу
   * @param {ObjectTypes} checkbox
   */
  onCheck(checkbox: ObjectTypes) {
    // Старое подключение
    // this.todoService.CheckTodo(checkbox);

    // Новое подключение
    checkbox.completed = !checkbox.completed;
    this.todoService.updateHero(checkbox).subscribe();
  }

  /**
   * Удаление задачи
   * @param {ObjectTypes} del Удаляемый Обьект
   */
  onDelete(del: ObjectTypes) {
    // Старое подключение
    // this.todoService.DeleteTodo(del);

    // Новое подключение
    this.ObjectTodos = this.ObjectTodos.filter(h => h !== del);
    this.todoService.deleteHero(del).subscribe();
  }

  /**
   * Костыль из-за неполноценной работы HTTP
   * @param {ObjectTypes} newTodo
   */
  add(newTodo: ObjectTypes) {
    newTodo.id = this.ObjectTodos.length + 1;
    const copy = this.ObjectTodos.map(a => ({...a})); // поверхносное копирование масива обьектов(1 уровня)
    copy.push(newTodo);
    this.ObjectTodos = copy;
  }
}
