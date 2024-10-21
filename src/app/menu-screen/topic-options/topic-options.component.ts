import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';

import { QuizService } from '../../core/quiz.service';
import { Topic } from '../../models';

@Component({
  selector: 'app-topic-options',
  standalone: true,
  templateUrl: './topic-options.component.html',
  styleUrl: './topic-options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicOptionsComponent {
  @Input({ required: true })
  public topics!: Topic[];

  private readonly quizService = inject(QuizService);

  public isTopicChecked(topic: Topic): boolean {
    return topic.name === this.quizService.getQuizParams()?.topic;
  }

  public setTopic(topic: Topic): void {
    this.quizService.setTopic(topic);
  }
}
