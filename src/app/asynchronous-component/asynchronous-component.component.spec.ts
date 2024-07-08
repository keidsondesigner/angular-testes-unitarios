import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AsynchronousComponentComponent } from './asynchronous-component.component';
import { of } from 'rxjs';
import { HttpService } from '../service/http.service';
import { By } from '@angular/platform-browser';

describe('AsynchronousComponentComponent', () => {
  let component: AsynchronousComponentComponent;
  let fixture: ComponentFixture<AsynchronousComponentComponent>;
  let http: HttpService // Criando variável do Serviço e tipando

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsynchronousComponentComponent ],
      imports: [HttpClientTestingModule] // Para testes que requisições e simular chamadas HTTP
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsynchronousComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http = TestBed.inject(HttpService) // injecção do Serviço
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve fazer requsição para obter lista de usuários', () => {
    const MOCK_USERS = [
      {
        "id": 3,
        "name": "Danilo",
        "email": "danilo@gmail.com",
        "age": "30",
      },
      {
        "id": 4,
        "name": "Arthur",
        "email": "arthur@gmail.com",
        "age": "7",
      }
    ];

    spyOn(http, 'getUsers').and.returnValue(of(MOCK_USERS));

    component.getUsers(); // Chamar o metodo getUsers();

    expect(component.data).toEqual(MOCK_USERS); // data é quem recebe a resposta através do subscribe;
  });

  it('Deve logar usuário', (done: DoneFn) => {
    const loggedOut: HTMLDivElement =  fixture.nativeElement.querySelector('.logged-out');

    let spy = spyOn(http, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.isAuthenticaded();

    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      const loggedIn: HTMLDivElement =  fixture.nativeElement.querySelector('.logged');

      expect(loggedIn.textContent).toBe('Logado');
      done(); // Finaliza os testes assíncronos com done();
    });

    expect(loggedOut.textContent).toBe('Deslogado');
  });

  it('Deve logar usuário com whenStable', async () => {
    const loggedOut: HTMLDivElement =  fixture.nativeElement.querySelector('.logged-out');
    expect(loggedOut.textContent).toBe('Deslogado');

    spyOn(http, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.isAuthenticaded();

    await fixture.whenStable().then(() => {
      fixture.detectChanges();
      const loggedIn: HTMLDivElement =  fixture.nativeElement.querySelector('.logged');

      expect(loggedIn.textContent).toBe('Logado');
    });
  });

  it('Deve logar usuário com fakeAsync', fakeAsync(() => {
    component.defineValue();

    tick(500);
    expect(component.name).toBe('Karol');
  }));
});
