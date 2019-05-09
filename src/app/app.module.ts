/** Модуль для приложения */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
      BrowserModule,           // подключаем 1 раз ток в "app"
      BrowserAnimationsModule, // подключение анимации
      AppRoutingModule,        // регистрация роутера для страниц
      SharedModule.forRoot(),  // регистрация модуля для обших файлов (модульное подключение)
  ],
  declarations: [ AppComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
