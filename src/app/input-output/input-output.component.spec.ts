import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputComponent } from './input-output.component';

describe('InputOutputComponent', () => {
  let component: InputOutputComponent;
  let fixture: ComponentFixture<InputOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve receber os dados do usuário @Input', () => {
    // dados passado no component pai
    const user = {name: 'Danilo', email: 'danilodev.silva@gmail.com', password: '091011'};

    component.user = user;

    expect(component.user).toBe(user);
  });

  it('Deve emitir mensagem quando o botão for clicado @Output', () => {
    // click do botão é passado do filho pro pai
    // escultando os eventos emitidos pelo userMessage
    const emitMessage = spyOn(component.userMessage, 'emit');

    let button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    // ao clicar no botão, espero que o evento emitMessage, seja chamado(emitido);
    expect(emitMessage).toHaveBeenCalled();
  });

});
