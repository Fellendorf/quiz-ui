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
  public index!: number;

  private readonly eventService = inject(EventService);
  private readonly cdr = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.eventService.listen(GlobalEvents.questionChanged)?.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  public setColor(question: Question): state {
    if (question.userAnswer === undefined) {
      return 'untouched';
    } else if (question.answer.index === question.userAnswer) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  public markCurrent(itemIndex: number): string {
    return itemIndex === this.index ? 'current' : '';
  }
}
