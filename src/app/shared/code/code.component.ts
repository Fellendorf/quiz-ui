import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import hljs from 'highlight.js';
import { QuestionCode } from '../../quiz-screen/models';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeComponent {
  @Input() public code!: QuestionCode;

  public highlightCode(code: string, language: string): string {
    return hljs.highlight(code, { language }).value;
  }
}
