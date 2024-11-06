import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import hljs from 'highlight.js';
import { Code } from '../../models';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeComponent {
  @Input({
    required: true,
  })
  public code!: Code;

  public highlightCode(code: string, language: string): string {
    return hljs.highlight(code, { language }).value;
  }
}
