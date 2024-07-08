import { TestBed } from '@angular/core/testing';

import { GuardGuard } from './guard.guard';
import { Router } from '@angular/router';

describe('GuardGuard', () => {
  let guard: GuardGuard;
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/login' };
  let routerMock = {navigate: jasmine.createSpy('nagigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });
    guard = TestBed.inject(GuardGuard);
    localStorage.removeItem('token'); // limpa o token antes de cada teste "it";
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('Deve redirecionar para login, quando o token estiver vazio', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toBeFalsy();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('Deve conceder acesso, quando usuario tiver token', () => {
    const token = 'adadoi24nm2nmadad';
    localStorage.setItem('token', token);

    expect(guard.canActivate(routeMock, routeStateMock)).toBeTruthy();
  });
});
