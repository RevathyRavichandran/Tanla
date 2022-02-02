import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DashboardComponent } from './dashboard.component';
import { PlotComponent } from './plot/plot.component';
import { RouterModule } from '@angular/router';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { MatButtonModule } from '@angular/material/button';
import { FeedbackComponent } from './feedback/feedback.component';
import { QuestionariesComponent } from './questionaries/questionaries.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CountUpModule } from 'ngx-countup';
import { MatDatepickerModule } from '@angular/material/Datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

PlotlyModule.plotlyjs = PlotlyJS;
import { ChartsModule } from 'ng2-charts';
import { RespondentMastersComponent } from './respondent-masters/respondent-masters.component';
import { SurveyComponent } from './survey/survey.component';
import { PopupComponent } from './popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SurveyPopupComponent } from './survey-popup/survey-popup.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { AdminComponent } from './admin/admin.component';
import { AdminPopupComponent } from './admin-popup/admin-popup.component';
import { AuditComponent } from './audit/audit.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PlotComponent,
    FeedbackComponent,
    QuestionariesComponent,
    ConfigurationComponent,
    RespondentMastersComponent,
    SurveyComponent,
    PopupComponent,
    SurveyPopupComponent,
    AdminComponent,
    AdminPopupComponent,
    AuditComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    CommonModule,
    MatTooltipModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      outerStrokeWidth: 10,
      innerStrokeWidth: 5,
      showBackground: false,
      startFromZero: false,
      showSubtitle: false,
    }),
    NgbModule,
    ChartsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatCardModule,
    CountUpModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    PlotlyModule,
    FormsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  exports: [DashboardComponent, PlotComponent],
})
export class DashboardModule {}
