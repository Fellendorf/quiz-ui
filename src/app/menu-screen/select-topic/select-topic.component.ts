import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';

import { QuizService } from '../../core/quiz.service';
import { Topic } from '../../models';

@Component({
  selector: 'app-select-topic',
  standalone: true,
  templateUrl: './select-topic.component.html',
  styleUrl: './select-topic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTopicComponent {
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
