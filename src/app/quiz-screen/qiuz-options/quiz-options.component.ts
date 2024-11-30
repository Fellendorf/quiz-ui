import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { EventService } from '../../core/event.service';
import { GlobalEvents, Option } from '../../models';

@Component({
  selector: 'app-quiz-options',
  standalone: true,
  imports: [],
  templateUrl: './quiz-options.component.html',
  styleUrl: './quiz-options.component.scss',
})
export class QuizOptionsComponent implements OnInit {
  @Input()
  public options!: Option[];

  @Output()
  public answer = new EventEmitter<number[]>();

  @ViewChildren('input')
  private inputs!: QueryList<ElementRef<HTMLInputElement>>;

  private readonly eventService = inject(EventService);

  private userAnswer: number[] = [];

  public ngOnInit(): void {
    this.eventService
      .listen(GlobalEvents.questionChanged)
      ?.subscribe(() => this.questionChanged());
  }

  public changeAnswer(optionIndex: number) {
    const isChecked = this.inputs.get(optionIndex)?.nativeElement.checked;
    if (isChecked) {
      this.userAnswer.push(optionIndex);
    } else {
      this.userAnswer = this.userAnswer.filter(
        (answer) => answer !== optionIndex,
      );
    }
    this.answer.emit(this.userAnswer);
  }

  private questionChanged() {
    this.userAnswer = [];
    [...this.inputs].forEach((input) => (input.nativeElement.checked = false));
  }
}
