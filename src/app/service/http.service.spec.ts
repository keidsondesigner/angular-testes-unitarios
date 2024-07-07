import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService; // Simula meu Service
  let htppTestingController: HttpTestingController; // Simula chamadas HTTP
  let url: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpService);
    htppTestingController = TestBed.inject(HttpTestingController)
    url = 'http://localhost:3000'
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada GET para listar um usuário por id', () => {
    const id = 3;
    const MOCK_USER = {
      id: 3,
      name: "Danilo",
      email: "danilo@gmail.com",
      age: "30",
    }

    service.getUsersById(id).subscribe(res => {
      expect(res).toEqual(MOCK_USER);
    });

    const req = htppTestingController.expectOne(`${url}/users/${id}`);

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(`${url}/users/${id}`);
    req.flush(MOCK_USER); // flush() Simula a resposta do retorno da chamada GET
  });

  it('Deve realizar chamada GET para listar todos os usuários', () => {
    const MOCK_USERS = [
      {
        id: 3,
        name: "Danilo",
        email: "danilo@gmail.com",
        age: "30",
      },
      {
        id: 4,
        name: "Arthur",
        email: "arthur@gmail.com",
        age: "7",
      }
    ];

    service.getUsers().subscribe(res => {
      expect(res).toEqual(MOCK_USERS);
    });

    const req = htppTestingController.expectOne(`${url}/users`);

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(`${url}/users`);
    req.flush(MOCK_USERS); // flush() Simula a resposta do retorno da chamada GET
  });

  it('Deve gerar erro 500 ou listar todos os usuários', () => {
    service.getUsers().subscribe({
      error: (err) => {
        expect(err.status).toBe(500);
      }
    });

    const req = htppTestingController.expectOne(`${url}/users`);

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(`${url}/users`);

    req.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });
});
