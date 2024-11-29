import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import { GlobalEvents, Question } from '../../models';
import { EventService } from '../../core/event.service';
import { QuizService } from '../../core/quiz.service';

type state = 'untouched' | 'correct' | 'incorrect';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input()
  public questions!: Question[];

  @Input()
  public userAnswers!: number[][];

  @Input()
  public questionIndex!: number;

  private readonly eventService = inject(EventService);
  private readonly quizService = inject(QuizService);
  private readonly cdr = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.eventService.listen(GlobalEvents.questionChanged)?.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  public setState(questionIndex: number): state {
    const userAnswer = this.userAnswers[questionIndex];
    if (userAnswer === undefined) {
      return 'untouched';
    } else if (this.quizService.isUserAnswerCorrect(questionIndex)) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  public markCurrent(questionIndex: number): string {
    return questionIndex === this.questionIndex ? 'current' : '';
  }
}
