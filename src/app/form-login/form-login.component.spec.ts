import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../service/http.service';

import { FormLoginComponent } from './form-login.component';
import { of } from 'rxjs';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  let service: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLoginComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule // Para testes que requisições e simular chamadas HTTP
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve retornar formulário inválido', () => {
    const result = component.isValidForm();
    expect(result).toBeFalsy();
  });

  it('Deve retornar formulário válido', () => {
    // preencher os campos do formulário
    component.form.controls['email'].setValue('keidsondev@gmail.com');
    component.form.controls['password'].setValue('123');

    fixture.detectChanges();

    // verificar se o formulário é válido
    const result = component.isValidForm();
    expect(result).toBeTruthy();
  });

  it('Deve desabilitar o botão, quando formulário for inválido', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('.btn-login');
    // verificar se btn está desabilitado
    expect(btn.disabled).toBeTrue();

    // verificar se o formulário é inválido
    const result = component.isValidForm();
    expect(result).toBeFalsy();
  });

  it('Deve habilitar o botão, quando formulário for válido', () => {
    // preencher os campos do formulário
    component.form.controls['email'].setValue('keidsondev@gmail.com');
    component.form.controls['password'].setValue('123');

    fixture.detectChanges();

    const btn = fixture.debugElement.nativeElement.querySelector('.btn-login');
    // verificar se btn não está desabilitado
    expect(btn.disabled).toBeFalse();

    // verificar se o formulário é válido
    const result = component.isValidForm();
    expect(result).toBeTrue();
  });

  it('Deve retornar o valor de um controle do formulário', () => {
    component.form.controls['email'].setValue('keidsondev@gmail.com');
    fixture.detectChanges();

    expect(component.getValueControl(component.form, 'email')).toEqual('keidsondev@gmail.com');
  });

  it('Deve criar dados (payload) para submeter o formulário para api', () => {

    const payload = {
      email: 'keidsondev@gmail.com',
      password: '123'
    }

    expect(component.createPayload('keidsondev@gmail.com', '123')).toEqual(payload)
  });

  it('Deve realizar o login, ao submeter o formulário para o Service', () => {
    // preencher os campos do formulário
    component.form.controls['email'].setValue('keidsondev@gmail.com');
    component.form.controls['password'].setValue('123');

    fixture.detectChanges();

    let response = {
      "id": "1",
      "email": "keidsondev@gmail.com",
      "password": "123456"
    }

    let spied = spyOn(service, 'login').and.returnValue(of(response));

    component.isValidForm();
    component.login();

    expect(spied).toHaveBeenCalledTimes(1);
  });
});
