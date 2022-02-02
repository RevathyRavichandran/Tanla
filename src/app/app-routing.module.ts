import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './dashboard/configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackComponent } from './dashboard/feedback/feedback.component';
import { LoginComponent } from './login/login.component';
import { QuestionariesComponent } from './dashboard/questionaries/questionaries.component';
import { RespondentMastersComponent } from './dashboard/respondent-masters/respondent-masters.component';
import { SurveyComponent } from './dashboard/survey/survey.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AuditComponent } from './dashboard/audit/audit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'questionaries',
    component: QuestionariesComponent,
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
  },
  {
    path: 'respondentMasters',
    component: RespondentMastersComponent,
  },
  {
    path: 'survey',
    component: SurveyComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'audit',
    component: AuditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
