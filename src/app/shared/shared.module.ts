import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ApiService } from './services/_api.service';
import { EventService } from './services/_event.service';
import { LocalStorageService } from './services/_localStorage.service';
import { HTTPTodoServiceService } from './services/HTTP-todo-service.service';

/* подробней :  https://angular.io/tutorial/toh-pt6#simulate-the-web-api */
import {HttpClientModule} from '@angular/common/http'; // HTTP модуль
import {HttpClientInMemoryWebApiModule, InMemoryWebApiModule} from 'angular-in-memory-web-api'; // перехватчики HTTP
import {InMemoryDataService} from './data'; // База возврата на запрос

@NgModule({
  imports: [
    CommonModule, FormsModule,
    RouterModule,

    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }  // и тут-же указываем какую БД мы будем использовать
    )
  ],
  declarations: [],
  exports: [],
  entryComponents: [],
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        DecimalPipe,
        ApiService,
        EventService,
        LocalStorageService,
        HTTPTodoServiceService
      ],
    };
  }

}
