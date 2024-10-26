import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { TopicInfo } from '../../models';

@Component({
  selector: 'app-topic-options',
  standalone: true,
  templateUrl: './topic-options.component.html',
  styleUrl: './topic-options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicOptionsComponent {
  @Input({ required: true })
  public topicsInfo!: TopicInfo[];

  @Input()
  public preselectedTopic?: string;

  @Output()
  public selectTopicEvent = new EventEmitter<string>();

  public selectTopic(topic: string) {
    this.selectTopicEvent.emit(topic);
  }

  public isTopicSelected(topic: string): boolean {
    return topic === this.preselectedTopic;
  }
}
