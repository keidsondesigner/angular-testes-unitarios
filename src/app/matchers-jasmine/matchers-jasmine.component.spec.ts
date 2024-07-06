import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchersJasmineComponent } from './matchers-jasmine.component';

describe('MatchersJasmineComponent', () => {
  let component: MatchersJasmineComponent;
  let fixture: ComponentFixture<MatchersJasmineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchersJasmineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchersJasmineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve testar o uso do matcher toEqual', () => {
    const h1: HTMLHeadingElement = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual('Matchers do Jasmine');
  })
  // it('Deve testar o uso do matcher toBe', () => {
  //   let nomes = ['Danilo', 'João', 'Carlos'];
  //   let nomes2 = ['Danilo', 'João', 'Carlos'];

  //   // O teste vai falhar, os obejtos comparados são diferentes, apesar de os dados serem iguais,
  //   // o toBe espera que objetos comparados sejam iguais.
  //   expect(nomes).toBe(nomes2);
  // })
  it('Deve testar o uso do matcher toBe', () => {
    let age = 10;
    expect(age).toBe(10);
  })

  it('Deve testar o uso do matcher toBeTruthy', () => {
    expect(true).toBeTruthy();
    expect(10).toBeTruthy();
    expect({}).toBeTruthy();
    expect([]).toBeTruthy();
  })

  it('Deve testar o uso do matcher toBeFalsy', () => {
    expect("").toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
    expect(0).toBeFalsy();
    expect(NaN).toBeFalsy();
  })

  it('Deve testar o uso do matcher toBetrue', () => {
    expect(true).toBeTrue();
  })

  it('Deve testar o uso do matcher toBeFalse', () => {
    expect(false).toBeFalse();
  })

  it('Deve testar o uso do matcher not', () => {
    expect("Danilo").not.toEqual("João");
  })

  it('Deve testar o uso do matcher toContain', () => {
    let nomes = ['Danilo', 'João', 'Carlos'];
    expect(nomes).toContain('Danilo');

    expect('Marvel').toContain('Marvel');
  })

  it('Deve testar o uso do matcher toBeDefined', () => {
    let idade;
    idade = 8;
    expect(idade).toBeDefined();
  })

  it('Deve testar o uso do matcher toBeUndefined', () => {
    let rua;
    expect(rua).toBeUndefined();
  })

  it('Deve testar o uso do matcher toBeNull', () => {
    expect(null).toBeNull();
  })

  it('Deve testar o uso do matcher toBeNaN', () => {
    expect(NaN).toBeNaN();
  })

  it('Deve testar o uso do matcher toBeGreatherThan', () => {
    let numero = 10;
    expect(numero).toBeGreaterThan(5);
  })

  it('Deve testar o uso do matcher toBeLessThan', () => {
    let numero = 34;
    expect(numero).toBeLessThan(242);
  })

  it('Deve testar o uso do matcher toBeCloseTo', () => {
    expect(35.21).toBeCloseTo(35.26, 1);
  })

  it('Deve testar o uso do matcher toMatch', () => {
    expect('Danilo').toMatch(/n/);
  })

  it('Deve testar o uso do matcher toThrow', () => {
    expect(() => { throw new Error('Meu erro code: 435') }).toThrow();
  })
});


