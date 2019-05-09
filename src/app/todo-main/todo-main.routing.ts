import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TodoMainComponent} from './todo-main.component';
import {TodoDetailedComponent} from './todo-list/todo-detailed/todo-detailed.component';


const MyChildRoutes: Routes = [{
    path: '',
    component: TodoMainComponent,
    children: [
      {
        path: 'item/:id',
        component: TodoDetailedComponent
      },
      {path: '**', redirectTo: ''}
    ]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(MyChildRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TodoChildRouting {}
