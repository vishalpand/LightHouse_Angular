import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
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
import { SupportComponent } from './components/support/support.component';
import { SuperdashbordComponent } from './components/superdashbord/superdashbord.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route redirects to login
  { path: 'login', component: LoginComponent },
  {
    path: 'ApmosysAngularMonitoringPortal', // Parent route
    children: [
      { path: 'Dashboard', component: DashbordComponent }, 
      { path: 'superUserDashboard', component: SuperdashbordComponent },// Dashboard component
      { path: 'Dashboard/downTimeapp', component: SupportComponent }, // Supports component
      { path: 'Dashboard/user', component: UserCreationComponent },
      { path: 'Dashboard/onbord', component: AppOnbordingComponent },
      
      { path: 'Dashboard/waterfall', component: WaterfallComponent },

      { path: 'Dashboard/harstatus', component: HarstatusComponent },
      { path: 'Dashboard/addEscalationLevel', component: AddEscalationComponent },
      { path: 'Dashboard/summaryReport', component: SummaryReportComponent },
      { path: 'Dashboard/performanceReport', component: PerformanceReportComponent },
      { path: 'Dashboard/downTimeReport', component: DownTimeReportComponent },
      { path: 'Dashboard/report_error', component: IssuesComponent },
      { path: 'Dashboard/escalationReport', component: EscalatedIssuesComponent },
      { path: 'Dashboard/solved_error', component: SolvedIssuesComponent },
      { path: 'Dashboard/skipped_error', component: SkippedIssuesComponent },
      { path: 'Dashboard/addEscalation', component: AddRaisedEscaltionComponent},
      // { path: 'Dashboard/skipped_error', component: SkippedIssuesComponent },
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }, // Default child route redirects to dashboard
    ]
  },
  { path: '**', redirectTo: '/login' } // Redirect invalid routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
