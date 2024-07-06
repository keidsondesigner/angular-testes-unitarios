import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StubComponent } from './stub.component';

describe('StubComponent', () => {
  let component: StubComponent;
  let fixture: ComponentFixture<StubComponent>;
  let router: Router; // daclaro a variável do tipo Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StubComponent ],
      providers: [
        {
          provide: Router, // quando chamar meu Router original, ele vai usar o método navigate da minha Class mockada
          useClass: class {
            navigate = jasmine.createSpy('navigate')
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router) // instância o Router com inject
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve navegar para home ao clicar no botão', () => {
    component.goTo();
    // verifica se o método navigate foi chamado com o argumento ['/home']
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

});
