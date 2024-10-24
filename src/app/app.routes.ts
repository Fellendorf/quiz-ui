import { Routes } from '@angular/router';
import { MenuScreenComponent } from './menu-screen/menu-screen.component';
import { QuizScreenComponent } from './quiz-screen/quiz-screen.component';
import { ResultsScreenComponent } from './results-screen/results-screen.component';
import { SettingsScreenComponent } from './settings-screen/settings-screen.component';
import { EditQuestionScreenComponent } from './edit-question-screen/edit-question-screen.component';

export enum ROUTE_PATHES {
  MENU = '',
  QUIZ = 'quiz',
  RESULTS = 'results',
  SETTINGS = 'settings',
  EDIT_QUESTION = 'edit-question',
}

export const routes: Routes = [
  {
    path: ROUTE_PATHES.MENU,
    component: MenuScreenComponent,
  },
  {
    path: ROUTE_PATHES.QUIZ,
    component: QuizScreenComponent,
  },
  {
    path: ROUTE_PATHES.RESULTS,
    component: ResultsScreenComponent,
  },
  {
    path: ROUTE_PATHES.SETTINGS,
    component: SettingsScreenComponent,
  },
  {
    path: `${ROUTE_PATHES.EDIT_QUESTION}/:id`,
    component: EditQuestionScreenComponent,
  },
];
