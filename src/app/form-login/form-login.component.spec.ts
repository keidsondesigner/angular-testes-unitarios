import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../service/http.service';

import { FormLoginComponent } from './form-login.component';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLoginComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
