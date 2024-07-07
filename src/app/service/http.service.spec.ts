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

  it('Deve realizar chamada GET por id', () => {
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
});
