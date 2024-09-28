import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashbordService } from 'src/app/services/dashbord.service';
import { EcalatesService } from 'src/app/services/ecalates.service';

@Component({
  selector: 'app-escalated-issues',
  templateUrl: './escalated-issues.component.html',
  styleUrls: ['./escalated-issues.component.css']
})
export class EscalatedIssuesComponent {

  toDayDate:any
  escalatedIssueAlllist:any
  applicationList: any;
  appName:string='';
  startDate:string='';
  STime:string='';
  endDate:string='';
  Etime:string='';




  filteredList = [];
  pageSize = 10;
  currentPage = 1;
  searchQuery = '';


  constructor(private ecalatesService:EcalatesService,private router: Router,private dashboardService: DashbordService){
  // Get today's date in the format 'yyyy-MM-dd'
  this.toDayDate = new Date().toISOString().split('T')[0];
  }


  ngOnInit(): void {
    this.getApplicationAlllist();
  }

  getApplicationAlllist() {
    let user_Id = localStorage.getItem('user_id');
    this.dashboardService.getApplicationlist(user_Id)
      .subscribe((response: any) => {
        this.applicationList = response.serviceResponse;
        // localStorage.setItem('appName', this.applicationList[0]);
        console.log("applicationList---", this.applicationList);
      }, (error: any) => {
        // Handle the error
        console.error('Login error:', error);
      });
  }

  currentIssue(){
    this.router.navigate(['/ApmosysMonitoringPortal/Dashboard/report_error']);
  }

  skkipedIssue(){
    this.router.navigate(['/ApmosysMonitoringPortal/Dashboard/solved_error']); 
  }

  solvedIssue(){
    this.router.navigate(['/ApmosysMonitoringPortal/Dashboard/skipped_error']);

  }

  getEscalatedReport(){
    console.log(this.appName);
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.STime);
    console.log(this.Etime);

    let startdatetime = this.startDate+' '+this.STime;
    let endatetime = this.endDate+' '+this.Etime;

    this.ecalatesService.getEscalatedIssueAll(this.appName,startdatetime,endatetime)
    .subscribe((response: any) => {
      this.escalatedIssueAlllist = response.serviceResponse;
    
      console.log("applicationList---", this.escalatedIssueAlllist);
    }, (error: any) => {
      // Handle the error
      console.error('Login error:', error);
    });
  }







  applyFilter(): void {
    this.filteredList = this.escalatedIssueAlllist.filter((item: { app_Name: string; page_Name: string; start_Time: string; level: string; createdOn: string; comments: string; }) => {
      const searchString = this.searchQuery.toLowerCase();
      return (
        item.app_Name.toLowerCase().includes(searchString) ||
        item.page_Name.toLowerCase().includes(searchString) ||
        item.start_Time.toLowerCase().includes(searchString) ||
        item.level.toLowerCase().includes(searchString) ||
        item.createdOn.toLowerCase().includes(searchString) ||
        item.comments.toLowerCase().includes(searchString)
      );
    });
    this.currentPage = 1; // Reset to the first page on search
  }

  get paginatedList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredList.slice(startIndex, startIndex + this.pageSize);
  }

  setPageSize(event: any): void {
    this.pageSize = event;
    this.currentPage = 1; // Reset to the first page on page size change
  }

  onSearchChange(event: any): void {
    this.searchQuery = event.target.value;
    this.applyFilter();
  }


}
