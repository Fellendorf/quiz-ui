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

import { Question, GlobalEvents } from '../models';
import { ButtonComponent } from '../../shared/button/button.component';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [ButtonComponent],
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
      .listen(GlobalEvents.uncheckInputs)
      ?.subscribe(() => this.uncheckInputs());
  }

  private uncheckInputs() {
    [...this.inputs].forEach((input) => (input.nativeElement.checked = false));
  }
}
