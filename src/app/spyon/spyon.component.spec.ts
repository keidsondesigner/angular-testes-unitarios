import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpyonComponent } from './spyon.component';

describe('SpyonComponent', () => {
  let component: SpyonComponent;
  let fixture: ComponentFixture<SpyonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpyonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve logar usuário no sistema ao clicar no botão', () => {
    // spyOn serve para ouvir a chamada de um método;
    const spy = spyOn(component, 'isLogged').and.callThrough();
    // dispara o método(simula o click no botão);
    component.isLogged();

    // esperado que "isLogged" tenha sido chamado ao menos umas vez;
    expect(spy).toHaveBeenCalled();
    // depois de clicado a variável logged, deve retornar o valor True;
    expect(component.logged).toBeTrue();
  });
});
