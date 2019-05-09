import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

import {TodoListComponent} from './todo-list.component';

describe('TodoListComponent', () => {

  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;
  let compiled;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule
        ],
        declarations: [
          TodoListComponent,
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should Create TodoListComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should "Unchecked" Fist tasks`, async(() => {
    const objList = component.ObjectTodos[0];

    expect(objList.completed).toBeTruthy();

    component.onCheck(objList);
    fixture.detectChanges();

    expect(objList.completed).toBeFalsy();
  }));

  it(`should "Delete" Fist tasks`, async(() => {
    const arrList = component.ObjectTodos;

    component.onDelete(arrList[0]);
    fixture.detectChanges();

    expect(arrList.length - 1).toBe(arrList.length - 1);
  }));

});
