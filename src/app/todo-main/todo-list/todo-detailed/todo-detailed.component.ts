import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';  // для перехода по истории
import {ActivatedRoute, Router} from '@angular/router';
import {HTTPTodoServiceService} from '../../../shared/services/HTTP-todo-service.service';
import {ObjectTypes} from '../../../shared/model/ObjectTypes';

@Component({
  selector: 'app-todo-detailed',
  templateUrl: './todo-detailed.component.html',
  styleUrls: ['./todo-detailed.component.styl']
})
export class TodoDetailedComponent implements OnInit {

  ObjectTodo: ObjectTypes;

  constructor(
    private Rout: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private todoService: HTTPTodoServiceService
  ) {}


  ngOnInit() {
    // // Новое подключение
    // // подписываемся на изменения, но нужна перезагрузка компонента
    // const id = +this.activatedRoute.snapshot.paramMap.get('id');
    // this.todoService.getHero(id)
    //   .subscribe(todoDetailed => this.ObjectTodo = todoDetailed);
    // // Новое подключение
    // // подписываемся на изменения, перезагрузка компонента ненужна
    this.activatedRoute.params.subscribe((params) => {
      this.todoService.getHero(params.id)
        .subscribe(todoDetailed => this.ObjectTodo = todoDetailed );
    });




    // // Старое подключение
    // this.activatedRoute.params
    //   .subscribe((params) => {
    //     this.ObjectTodo = this.todoService.getDateBaseTodos(params.id);
    //   });
  }

  returnHistory() {
    // this.location.back(); // по истории назад  -  https://angular.io/api/common/Location
    this.Rout.navigate(['/todo']); // переброс
  }

}
