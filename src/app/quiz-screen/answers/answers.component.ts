import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';

import { EventService } from '../../core/event.service';
import { Question, GlobalEvents } from '../../models';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss',
})
export class AnswersComponent implements OnInit {
  @Input()
  public options!: Question['options'];

  @Output()
  public answer = new EventEmitter<number>();

  @ViewChildren('input')
  private inputs!: ElementRef<HTMLInputElement>[];

  private readonly eventService = inject(EventService);

  public ngOnInit(): void {
    this.eventService
      .listen(GlobalEvents.questionChanged)
      ?.subscribe(() => this.questionChanged());
  }

  private questionChanged() {
    [...this.inputs].forEach((input) => (input.nativeElement.checked = false));
  }
}
