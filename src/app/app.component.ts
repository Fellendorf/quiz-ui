import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizScreenComponent } from './quiz/quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuizScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'quiz-ui';
}
