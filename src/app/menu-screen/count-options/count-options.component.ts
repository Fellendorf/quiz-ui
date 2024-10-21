import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { QuizService } from '../../core/quiz.service';

@Component({
  selector: 'app-count-options',
  standalone: true,
  templateUrl: './count-options.component.html',
  styleUrl: './count-options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountOptionsComponent {
  @Input({ required: true })
  public countOptions!: number[];

  private readonly quizService = inject(QuizService);

  public isCountChecked(count: number): boolean {
    return count === this.quizService.getQuizParams()?.count;
  }

  public setCount(count: number): void {
    this.quizService.setCount(count);
  }
}
