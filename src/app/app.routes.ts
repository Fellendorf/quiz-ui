import { Routes } from '@angular/router';
import { MenuScreenComponent } from './menu-screen/menu-screen.component';
import { QuizScreenComponent } from './quiz-screen/quiz-screen.component';
import { ResultsScreenComponent } from './results-screen/results-screen.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuScreenComponent,
  },
  {
    path: 'quiz',
    component: QuizScreenComponent,
  },
  {
    path: 'results',
    component: ResultsScreenComponent,
  },
];
