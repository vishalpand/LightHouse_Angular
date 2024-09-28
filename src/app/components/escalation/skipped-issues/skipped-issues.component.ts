import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CurrentIsueeService } from 'src/app/services/current-isuee.service';
import { DashbordService } from 'src/app/services/dashbord.service';
import { SkippedIssueService } from 'src/app/services/skipped-issue.service';
// import { EscalationfilterPipe } from 'src/app/filter/escalationfilter.pipe';
@Component({
  selector: 'app-skipped-issues',
  templateUrl: './skipped-issues.component.html',
  styleUrls: ['./skipped-issues.component.css'],
})
export class SkippedIssuesComponent implements OnInit {

  getFilteredList: string[] = [];
  toDayDate: any;
  startDate: any = moment().format('YYYY-MM-DD');
  startTime: any = '00:00:00';
  endDate: any = moment().format('YYYY-MM-DD');
  endTime: any = '23:59:59';
  oneMonthAgoDate: any;
    filterValue!: string;
  constructor(
    private skippedIssueService: SkippedIssueService,
    private dashbordService: DashbordService,
    private currentIsueeService: CurrentIsueeService
  ) {
    this.toDayDate = new Date().toISOString().split('T')[0];
  }


  ngOnInit(): void {
    // Calculate one month ago and set it
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    this.oneMonthAgoDate = this.formatDate(oneMonthAgo);
    this.startDate = this.oneMonthAgoDate;

    // =====================GET APPLICATION LIST=====================
    this.getAllApplicationList();

    // load the whole list=================

    this.skippedIssueService
      .getIssuesOnEscalationByStatus(
        'All',
        this.startDate + ' ' + this.startTime,
        this.endDate + ' ' + this.endTime,
        'skipped'
      )
      .subscribe(
        (response: any) => {
          this.getAllSkippedList = response.serviceResponse;
          // saving in filtered list
          this.getFilteredList=this.getAllSkippedList;
          // for pagination
          this.totalItems = this.getFilteredList.length;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          this.getListForPagination = this.getAllSkippedList.slice(
            0,
            this.pageSize
          );
        },
        (error: any) => {
          console.log('error---', error);
        }
      );
  }
 
  getAllSkippedList: string[] = [];
  getApplicationList: string[] = [];
  getApplicationTypes: any[] = [];
  applicationName: string = 'All';
  sortedApplicationNameList: string[] = [];

  // ===================START DATE======================
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padNumber(date.getMonth() + 1);
    const day = this.padNumber(date.getDate());

    return `${year}-${month}-${day}`;
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // =====================PAGINATION===========================

  getListForPagination: string[] = [];
  pageSize: number = 10; // Number of items per page
  currentPage: number = 1; // Current page number
  totalPages: number = 0; // Total pages
  totalItems: number = 0; // Total items

  // Event handler for page change
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getPaginatedData();
  }

  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.getListForPagination = this.getFilteredList.slice(
      startIndex,
      endIndex
    );
    this.pageNumbers();
  }

  pageNumbers(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  // change page size====================================================

  onSelectChange(event: any) {
    // console.log('Selected value:', event.target.value);
    this.pageSize = Number(event.target.value);
    this.currentPage = 1;
    this.getPaginatedData();
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.pageNumbers();
  }
  
  // =====================GET APPLICATION LIST===========================

  getAllApplicationList() {
    let userId = localStorage.getItem('user_id');

    this.dashbordService.getApplicationlist(userId).subscribe(
      (response: any) => {
        // console.log('response---', response);
        this.getApplicationList = response.serviceResponse;
        this.sortedApplicationNameList = this.getApplicationList.sort((a, b) =>
          a.localeCompare(b)
        );
      },
      (error: any) => {
        console.log('error---', error);
      }
    );
  }

  // ==========================GET SKIPPED LIST===================
  getIssuesOnEscalationByStatus() {
    this.skippedIssueService
      .getIssuesOnEscalationByStatus(
        this.applicationName,
        this.startDate + ' ' + this.startTime,
        this.endDate + ' ' + this.endTime,
        'skipped'
      )
      .subscribe(
        (response: any) => {
          this.getAllSkippedList = response.serviceResponse;
          this.getFilteredList=this.getAllSkippedList;
          // for pagination
          this.totalItems = this.getFilteredList.length;
          this.getListForPagination = this.getFilteredList.slice(
            0,
            this.pageSize
          );
        },
        (error: any) => {
          console.log('error---', error);
        }
      );
  }

  // ========================SEARCH FUNCTIONALITY=============================

  searchApplication(value: any) {
    // console.log(value);
    // console.log(this.getAllSkippedList)
  


    // this.getFilteredList=this.getAllSkippedList.filter(data=>data.includes(value))
   
    // console.log(this.getFilteredList);
    // this.totalItems = this.getFilteredList.length;
    // this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    // this.getListForPagination = this.getFilteredList.slice(
    //         0,
    //         this.pageSize
    //       );
    
    
  }

  applyFilter(){

    let filteredItems = this.filterValue ? this.filterItems(this.filterValue) : [...this.getAllSkippedList];
    console.log(this.filterValue)
    console.log("filteredItems",filteredItems)
    this.getFilteredList = filteredItems;
    this.totalItems = this.getFilteredList.length;
     this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.getListForPagination=this.getFilteredList.slice(0, this.pageSize);
    this.onPageChange(1); // Reset to first page when filtering



  }

// ===============================FILTER FUNCTIONALIY==============================
  

filterItems(filterValue: string): any[] {
    filterValue = filterValue.trim().toLowerCase();
    return this.getAllSkippedList.filter(row => {
      // Check each cell in the row array
      for (let cell of row) {
        
        if (cell != null && cell != undefined && cell.toString().toLowerCase().includes(filterValue)) {
        return  true ; 
          // Return true if any cell matches the filter
        }

      }
      return false; // Return false if no cell matches the filter
    });  }

  get filteredItems(): any[] {
    return this.filterValue ? this.filterItems(this.filterValue) : [...this.getAllSkippedList];
  }

  // ================================SCREENSHOT=============================================

  screenshotdata:any;
  isSreenshotmodal: boolean = false;
  screenshotUrl: any

  convertBase64ToUrl(base64: string): string {
    return `data:image/png;base64,${base64}`;
  }


  isCurrentclosemodal() {
    this.isSreenshotmodal = false;
    this.screenshotUrl = '';

  }

  getScreenShot(screenshotid: any) {
    this.isSreenshotmodal = true;

    const modalElement = document.getElementById('screenshotModal');

    this.currentIsueeService.getscreenshot(screenshotid).subscribe((response: any) => {
      this.screenshotdata = response.serviceResponse;
      // console.log("screenshot --", this.screenshotdata)
      // console.log("screenshot3 --", this.screenshotdata[0][2]);
      this.screenshotUrl = this.convertBase64ToUrl(this.screenshotdata[0][2]);

    }, (error: any) => {
      console.log(error);
    }
    )

  }

}