import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import { GlobalEvents, Question } from '../../models';
import { EventService } from '../../core/event.service';

type state = 'untouched' | 'correct' | 'incorrect';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input()
  public questions!: Question[];

  @Input()
  public userAnswers!: number[];

  @Input()
  public questionIndex!: number;

  private readonly eventService = inject(EventService);
  private readonly cdr = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.eventService.listen(GlobalEvents.questionChanged)?.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  public setState(question: Question, questionIndex: number): state {
    const userAnswer = this.userAnswers[questionIndex];
    if (userAnswer === undefined) {
      return 'untouched';
    } else if (question.options[userAnswer]?.isCorrect) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  public markCurrent(questionIndex: number): string {
    return questionIndex === this.questionIndex ? 'current' : '';
  }
}
