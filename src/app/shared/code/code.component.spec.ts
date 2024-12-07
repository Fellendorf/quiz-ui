import { ComponentFixture, TestBed } from '@angular/core/testing';
import hljs, { HighlightResult } from 'highlight.js';

import { CodeComponent } from './code.component';
import { Code } from '../../models';

describe('CodeComponent', () => {
  let componentInstance: CodeComponent;
  let fixture: ComponentFixture<CodeComponent>;

  const inputCode: Code = {
    text: 'Some code',
    language: 'javascript',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeComponent);
    componentInstance = fixture.componentInstance;
    componentInstance.code = inputCode;
    fixture.detectChanges();
  });

  it('The "highlightCode()" method should get highlighted by "highlight.js" code', () => {
    const highlightSpy = spyOn(hljs, 'highlight').and.returnValue({
      value: 'highlighted code',
    } as HighlightResult);
    componentInstance.highlightCode(inputCode.text, inputCode.language);

    expect(highlightSpy).toHaveBeenCalled();
  });
});
