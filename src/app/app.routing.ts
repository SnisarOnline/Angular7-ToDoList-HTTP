/** routing - редирект страниц по URL адресу
 * Чтобы внедрить routing :
 * 1) Создать сам файл app.routing.ts или в консоле набрать
 *    ng generate module SomeModule --routing (or ng g m SomeModule --routing, for short)
 * 2) Зарегестрировать сервис в app.component.ts =>   @NgModule({ imports: [ AppRoutingModul ] })
 * */

import { RouterModule, Routes } from '@angular/router'; // для роутинга страниц нужны модули
import { NgModule } from '@angular/core';   // обработчик входа и выхода с настройками

const MyRootRoutes: Routes = [
  {
    path : 'todo',                                                // путь по которому сработае наш роут
    loadChildren: './todo-main/todo-main.module#TodoMainModule', // что нам покажет/подключит когда сработает
  },
  {
    path: '',
    loadChildren: './auth/auth.module#AuthModule',
  },
  { path: '**',  redirectTo: '', } // роут на который перекинет обработку // ну или перенаправим
];

@NgModule({
  imports: [
    RouterModule.forRoot(MyRootRoutes)   // применим наши настройки для роутинга forRoot
  ],
  exports: [
    RouterModule      // и после обработки выплюним на експорт
  ]
})

// готовый модуль отправим на регистрацию в NgModule->imports
export class AppRoutingModule {}
