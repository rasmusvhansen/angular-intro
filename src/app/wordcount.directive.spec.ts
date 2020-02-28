import { WordcountDirective } from './wordcount.directive';
import { ElementRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('Word count directive', () => {
  let directive: WordcountDirective;
  let element: ElementRef<HTMLElement>;

  beforeEach(() => {
    element = {
      nativeElement: {
        innerText: 'Some text with 5 words'
      }
    } as ElementRef<HTMLElement>;
    directive = new WordcountDirective(element);
  });

  it('should write the number of words in the title', () => {
    directive.ngAfterViewInit();
    expect(element.nativeElement.title).toBe('Contains 5 word(s)');
  });
});

@Component({
  template: `
    <div appWordcount>This div has many words</div>
  `
})
class TestWordcountDirectiveComponent {}

describe('Word count directive with testbed', () => {
  let fixture: ComponentFixture<TestWordcountDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordcountDirective, TestWordcountDirectiveComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWordcountDirectiveComponent);
    fixture.detectChanges();
  });

  it('should count the words in the element it is attached to', () => {
    const element = fixture.debugElement.query(By.css('div'));
    expect(element.nativeElement.title).toBe('Contains 5 word(s)');
  });
});
