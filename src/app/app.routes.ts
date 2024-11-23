import { Routes } from '@angular/router';
import { MenuScreenComponent } from './menu-screen/menu-screen.component';
import { QuizScreenComponent } from './quiz-screen/quiz-screen.component';
import { ResultsScreenComponent } from './results-screen/results-screen.component';
import { SettingsScreenComponent } from './settings-screen/settings-screen.component';
import { QuestionScreenComponent } from './question-screen/question-screen.component';
import { AdminQuestionsScreenComponent } from './admin-questions-screen/admin-questions-screen.component';
import { ROUTE_PATHES } from './models';

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
    path: `${ROUTE_PATHES.QUESTION}/:id`,
    component: QuestionScreenComponent,
  },
  {
    path: `${ROUTE_PATHES.ADMIN_QUESTIONS}/:topic`,
    component: AdminQuestionsScreenComponent,
  },
];
