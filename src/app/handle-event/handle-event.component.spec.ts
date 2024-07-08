import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleEventComponent } from './handle-event.component';

describe('HandleEventComponent', () => {
  let component: HandleEventComponent;
  let fixture: ComponentFixture<HandleEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve mostrar um emoji ao clicar no botão', () => {
    let h1 = fixture.nativeElement.querySelector('h1');
    let button = fixture.nativeElement.querySelector('button');

    button.click(); // disparando evento de click

    fixture.detectChanges();
    expect(h1.textContent).toBe('👨‍🎓');
  });
});
