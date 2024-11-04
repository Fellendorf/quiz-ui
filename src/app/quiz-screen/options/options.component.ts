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
import { GlobalEvents, Option } from '../../models';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent implements OnInit {
  @Input()
  public options!: Option[];

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
