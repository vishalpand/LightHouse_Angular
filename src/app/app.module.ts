import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashbordComponent } from './dashbord/dashbord.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserCreationComponent } from './components/admin/user-creation/user-creation.component';
import { AppOnbordingComponent } from './components/admin/app-onbording/app-onbording.component';
import { WaterfallComponent } from './components/waterfall/waterfall.component';
import { HarstatusComponent } from './components/harstatus/harstatus.component';
import { AddEscalationComponent } from './components/admin/add-escalation/add-escalation.component';
import { SummaryReportComponent } from './components/report/summary-report/summary-report.component';
import { PerformanceReportComponent } from './components/report/performance-report/performance-report.component';
import { DownTimeReportComponent } from './components/report/down-time-report/down-time-report.component';
import { IssuesComponent } from './components/escalation/issues/issues.component';
import { EscalatedIssuesComponent } from './components/escalation/escalated-issues/escalated-issues.component';
import { SolvedIssuesComponent } from './components/escalation/solved-issues/solved-issues.component';
import { SkippedIssuesComponent } from './components/escalation/skipped-issues/skipped-issues.component';
import { AddRaisedEscaltionComponent } from './components/escalation/add-raised-escaltion/add-raised-escaltion.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SupportComponent } from './components/support/support.component';
import { DatePipe ,HashLocationStrategy,LocationStrategy} from '@angular/common';
import { SuperdashbordComponent } from './components/superdashbord/superdashbord.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashbordComponent,
    SupportComponent,
    UserCreationComponent,
    AppOnbordingComponent,
    WaterfallComponent,
    HarstatusComponent,
    AddEscalationComponent,
    SummaryReportComponent,
    PerformanceReportComponent,
    DownTimeReportComponent,
    IssuesComponent,
    EscalatedIssuesComponent,
    SolvedIssuesComponent,
    SkippedIssuesComponent,
    AddRaisedEscaltionComponent,
    SuperdashbordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    DragDropModule
    
  ],
  providers: [DatePipe,{provide:LocationStrategy,useClass:HashLocationStrategy},],
  
  bootstrap: [AppComponent]
})
export class AppModule { }