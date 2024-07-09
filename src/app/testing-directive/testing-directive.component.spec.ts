import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoverFocusDirective } from '../hover-focus.directive';

import { TestingDirectiveComponent } from './testing-directive.component';

describe('TestingDirectiveComponent', () => {
  let component: TestingDirectiveComponent;
  let fixture: ComponentFixture<TestingDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestingDirectiveComponent,
        HoverFocusDirective
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve alterar background quando passar o mouse sobre o título.', () => {
    const title: HTMLHeadingElement =  fixture.nativeElement.querySelector('h1');

    // Simula o evento de passar o mouse sobre o título
    triggerMouseEvent(title, 'mouseover');
    // title.dispatchEvent(new MouseEvent('mouseover'));
    fixture.detectChanges();
    expect(title.style.backgroundColor).toBe('blue')

    // Simula o evento de remover o mouse do título
    triggerMouseEvent(title, 'mouseout');
    // title.dispatchEvent(new MouseEvent('mouseout'));
    fixture.detectChanges();
    expect(title.style.backgroundColor).toBe('inherit')
  });

  function triggerMouseEvent(element: HTMLElement, eventType: string) {
    const event = new Event(eventType);
    element.dispatchEvent(event);
    fixture.detectChanges();
  }
});
