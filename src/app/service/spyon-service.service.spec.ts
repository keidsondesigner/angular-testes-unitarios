import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SpyonServiceService } from './spyon-service.service';
import { of } from 'rxjs';

describe('SpyonServiceService', () => {
  let service: SpyonServiceService; // criado a variável e Tipando com o tipo SpyonServiceService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SpyonServiceService); // Injecção do Service para cuidar da instância
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar uma lista de usuários', () => {
    const MOCK_USERS = [
      {name: 'Danilo', email: 'danilodev.silva@gmail.com', password: '091011'},
      {name: 'Joao', email: 'joao@gmail.com', password: '091011'},
      {name: 'Pedro', email: 'pedro@gmail.com', password: '456848'},
    ];

    spyOn(service, 'getUsers').and.returnValue(of(MOCK_USERS));

    service.getUsers().subscribe(users => {
      expect(users).toEqual(MOCK_USERS);
    })
  })
});
