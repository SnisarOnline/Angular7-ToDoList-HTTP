import {TestBed, async, ComponentFixture} from '@angular/core/testing';
// [routerLink] = https://stackoverflow.com/questions/39577920/angular-2-unit-testing-components-with-routerlink/39587397
import {DebugElement, Directive, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing'; // декларируем привязки типо [routerLink]
import {FormsModule} from '@angular/forms'; // декларируем привязки типо [(ngModel)]
import {By} from '@angular/platform-browser'; // для поска елемента на странице

import {TodoMainComponent} from './todo-main.component';
import {TodoFormComponent} from './todo-form/todo-form.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {HTTPTodoServiceService} from '../shared/services/HTTP-todo-service.service';

// Directive для поиска по компоненту и сбора всех линков
@Directive({
    selector: '[routerLink]',
    host: {
        '(click)': 'onClick()'
    }
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('TodoMainComponent', () => {

    let component: TodoMainComponent;
    let fixture: ComponentFixture<TodoMainComponent>;
    let compiled;

    // Используя Directive мы получим список всех линков.
    let linkDes: DebugElement[];
    let links: RouterLinkStubDirective[];

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    FormsModule, // декларируем привязки типо [(ngModel)]
                    RouterTestingModule // декларируем привязки типо [routerLink]
                ],
                declarations: [
                    RouterLinkStubDirective, // Directive поможет собрать все линки.
                    TodoMainComponent, // декларируем проверяемый компонент
                    TodoFormComponent, // декларируем внутриний компонент
                    TodoListComponent, // декларируем внутриний компонент
                ],
                providers: [HTTPTodoServiceService], // декларируем подключенный сервис в дочерних компонентах.
                // schemas: [ NO_ERRORS_SCHEMA ] // можно проинорировать routerLink в дочерних компонентах.
            });

            TestBed.compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(TodoMainComponent); // создать экземпляр компонента.
                    component = fixture.debugElement.componentInstance; // Свойство возвращает объект компонента
                    compiled = fixture.debugElement.nativeElement; // Свойство возвращает объект DOM, представляющий управляющиэлемент для компонента
                    fixture.detectChanges(); // Метод заставляет тестовую среду обнаруживать изменения состония и отражать их в шаблоне компонента
                });
        })
    );

    // Используя Directive мы получим список всех линков.
    beforeEach(() => {
        // trigger initial data binding
        fixture.detectChanges();

        // find DebugElements with an attached RouterLinkStubDirective
        // найти DebugElements с прикрепленным RouterLinkStubDirective
        linkDes = fixture.debugElement
            .queryAll(By.directive(RouterLinkStubDirective));

        // get the attached link directive instances using the DebugElement injectors
        // получить прикрепленные ссылки для ссылок с использованием форсунок DebugElement
        links = linkDes
            .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    });


    it('should create TodoMainComponent', async(() => {
        console.log('- TEST "create" TodoMainComponent success');

        expect(component).toBeTruthy();
    }));

    it('Проверим все линки', async(() => {
        console.log('- TEST "[routerLink]" TodoMainComponent success');

        // // Етот пример обработает только первую найденную ссылку.
        // const href = fixture.debugElement.query(By.css('a')).nativeElement
        //     .getAttribute('href');
        // expect(href).toEqual('/todo/0');

        // пример из офицеального скачанного примера.
        // https://v4.angular.io/guide/testing#testing
        expect(links.length).toBe(4, 'should have 4 links');
        expect(links[0].linkParams).toBe('todo/0', '1st link "Learning HTML/CSS" ');
        expect(links[1].linkParams).toBe('todo/1', '2st link "Learning JavaScript" ');
        expect(links[2].linkParams).toBe('todo/2', '3st link "learning Angular CLI" ');
        expect(links[3].linkParams).toBe('todo/3', '4st link "New Title Todo" ');
    }));

});
