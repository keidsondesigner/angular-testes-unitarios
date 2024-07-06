import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ConceptsTestsComponent } from './concepts-tests.component';

describe('ConceptsTestsComponent', () => {

  let component: ConceptsTestsComponent; // criado a variável e Tipando o componente com o tipo ConceptsTestsComponent
  let fixture: ComponentFixture<ConceptsTestsComponent> // criado a variável e Tipando o componente com o tipo ComponentFixture<ConceptsTestsComponent>

  beforeEach(() => {

    TestBed.configureTestingModule({ // configureTestingModule é um auxiliar que ajuda a configura o modulo para testing.
      declarations: [ConceptsTestsComponent],
    }).compileComponents()


    fixture = TestBed.createComponent(ConceptsTestsComponent) // injecta o componente atraves do createComponent()
    component = fixture.componentInstance // instância o componente, com isso tenho acesso as atributos, propriedades, metodos e elementos do DOM.
    fixture.detectChanges();
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ConceptsTestsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

})
