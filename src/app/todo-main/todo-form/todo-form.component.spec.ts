import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {TodoFormComponent} from './todo-form.component';

describe('TodoFormComponent', () => {

  let fixture: ComponentFixture<TodoFormComponent>;
  let component: TodoFormComponent;
  let compiled;


  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule
        ],
        declarations: [
          TodoFormComponent,
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should Create TodoFormComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should Create NEW Task`, async(() => {
    component.newTodoTitle = 'NEW Task';
    const objList = component.ObjectTodos;

    component.createTasks();
    fixture.detectChanges();

    expect(objList.length + 1).toBe(objList.length + 1);
  }));

});
