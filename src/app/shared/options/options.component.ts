import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export type Option<ID, TE, IN> = {
  id: ID;
  text: TE;
  info?: IN;
};

@Component({
  selector: 'app-options',
  standalone: true,
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent<ID, TE, IN> {
  @Input({ required: true })
  public name!: string;

  @Input({ required: true })
  public options!: Option<ID, TE, IN>[];

  @Input()
  public default?: ID | null;

  public selected?: ID;

  @Output()
  public optionChange = new EventEmitter<ID>();

  @Output()
  public optionMounseOver = new EventEmitter<ID>();

  @Output()
  public optionMounseOut = new EventEmitter<ID>();

  public ngOnInit(): void {
    if (this.default) {
      this.selected = this.default;
    }
  }

  public selectOption(optionId: ID): void {
    this.selected = optionId;
    this.optionChange.emit(optionId);
  }

  public isSelected(optionId: ID): boolean {
    return optionId === this.selected;
  }

  public handleOptionMouseOver(id: ID): void {
    this.optionMounseOver.emit(id);
  }

  public handleOptionMouseOut(id: ID): void {
    this.optionMounseOut.emit(id);
  }
}
