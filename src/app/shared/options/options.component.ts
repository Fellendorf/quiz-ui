import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export type Option<T> = {
  name: T;
  info?: string;
};

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent<T> {
  @Input({ required: true })
  public name!: string;

  @Input({ required: true })
  public options!: Option<T>[];

  @Input()
  public default?: T | null;

  public selected?: T;

  @Output()
  public optionChange = new EventEmitter<T>();

  public ngOnInit(): void {
    if (this.default) {
      this.selected = this.default;
    }
  }

  public selectOption(option: T): void {
    this.selected = option;
    this.optionChange.emit(option);
  }

  public isSelected(option: T): boolean {
    return option === this.selected;
  }
}
