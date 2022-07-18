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
import { PasswordSetComponent } from './password-set/password-set.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './services/authguard.service';
import { ApproveSurveyComponent } from './dashboard/approve-survey/approve-survey.component';
import { AdminUserreportComponent } from './dashboard/admin-userreport/admin-userreport.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'approveSurvey',
    component: ApproveSurveyComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resetPassword',
    component: PasswordSetComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'passwordChanged',
    component: SuccessPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'feedbackReport',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questionnaire',
    component: QuestionariesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'respondentMasters',
    component: RespondentMastersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'survey',
    component: SurveyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'audit',
    component: AuditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userReport',
    component: AdminUserreportComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
