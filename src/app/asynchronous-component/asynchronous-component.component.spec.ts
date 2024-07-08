import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsynchronousComponentComponent } from './asynchronous-component.component';
import { of } from 'rxjs';
import { HttpService } from '../service/http.service';

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
});
