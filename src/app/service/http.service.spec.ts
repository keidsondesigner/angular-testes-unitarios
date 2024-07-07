import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';

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

  it('Deve realizar chamada POST para cadastrar um usuário', () => {
    const MOCK_USER = {
      "id": 45,
      "name": "Keidson",
      "email": "danilo@gmail.com",
      "age": "33",
    }

    const MOCK_PAYLOAD = {
      "id": 45,
      "name": "Keidson",
      "email": "danilo@gmail.com",
      "age": "33",
    }

    service.postUser(MOCK_USER).subscribe(res => {
      expect(res).toBe(MOCK_PAYLOAD);
    });

    const req = htppTestingController.expectOne(`${url}/users`);

    expect(req.request.method).toBe('POST');
    expect(req.request.url).toBe(`${url}/users`);
    req.flush(MOCK_PAYLOAD); // flush() Simula a resposta do retorno da chamada POST
  });

  it('Deve realizar chamada PUT para atualizar um usuário', () => {
    const id = 1;

    const MOCK_USER = {
      "name": "Keidson",
      "email": "danilo@gmail.com",
      "age": "33",
    }

    const MOCK_PAYLOAD = {
      "name": "Keidson editado",
      "email": "danilo@gmail.com",
      "age": "33",
    }

    service.putUser(id, MOCK_USER).subscribe(res => {
      expect(res).toBe(MOCK_PAYLOAD);
    });

    const req = htppTestingController.expectOne(`${url}/users/${id}`);

    expect(req.request.method).toBe('PUT');
    expect(req.request.url).toBe(`${url}/users/${id}`);
    req.flush(MOCK_PAYLOAD); // flush() Simula a resposta do retorno da chamada POST
  });

  it('Deve realizar chamada DELETE para exculír um usuário', () => {
    const id = 2;
    const response = {}

    service.deleteUser(id).subscribe(res => {
      expect(res).toBe(response);
    });

    const req = htppTestingController.expectOne(`${url}/users/${id}`);

    expect(req.request.method).toBe('DELETE');
    expect(req.request.url).toBe(`${url}/users/${id}`);
    req.flush(response); // flush() Simula a resposta do retorno da chamada POST
  });

  it('Deve conter os headers na requisição', () => {
    const token = 'wa45a5a45a5a5a4a5a4a5a55a5a5a5a5a5a5a';

    service.getUserWithHeaders().subscribe();

    const req = htppTestingController.expectOne(`${url}/users`);

    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    expect(req.request.headers.has('content-type')).toBeTruthy();
    expect(req.request.headers.get('content-type')).toEqual('application/json');
    // req.flush([]);
  });
});
