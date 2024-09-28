import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

import { CurrentIsueeService } from 'src/app/services/current-isuee.service';
import { DashbordService } from 'src/app/services/dashbord.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
})
export class IssuesComponent {
  currentDate: any;
  nameslist: string[] = [];
  emailsList: string[] = [];
  selectedEmail: string = '';
  SelectedContactIndex: number = 0;

  selectedLevel: string = '';
  Incremetlevetbyone: string = '';
  selectedId: any;

  applicationList: any;
  getallcurrentapplist: any;
  getcontactInfolist: any;
  viaemal: string = 'Email';
  levels: string[] = [];
  currentDateTime: string = '';

  appName: string = 'all';
  screenshotdata: any;
  screenshotUrl: any;
  isSreenshotmodal: boolean = false;
  isescalateModalopen: boolean = false;
  isSovledmodalopen: boolean = false;
  isEmailmodalopen: boolean = false;

  selectedAppName: string = '';
  selectedlevel: any;
  selectedpageName: any;

  level1: boolean = false;
  level2: boolean = false;
  level3: boolean = false;
  level4: boolean = false;
  level5: boolean = false;
  level6: boolean = false;
  level7: boolean = false;

  formData = {
    to: '',
    cc: '',
    subject: '',
    body: '',
    applicationName: '',
    pageName: '',
    currentDateTime: '',
    userId: '',
    levels: '',
    status: '',
    image: null as File | null,
  };

  status: string = 'escalate';

  constructor(
    private datePipe: DatePipe,
    private currentIsueeService: CurrentIsueeService,
    private dashboardService: DashbordService
  ) {}

  // ===================================================
  //                      PAGINATION
  // ====================================================

  isSelectAll: boolean = false;
  isSkipAll: boolean = false;
  selectedApplications: any[] = [];
  getListForPagination: any[] = [];
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
    // console.log('pageSize value:',this.pageSize);
    // console.log('currentPage value:',this.currentPage);
    // console.log('totalPages value:',this.totalPages);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.getListForPagination = [];
    this.getListForPagination = this.getallcurrentapplist.slice(
      startIndex,
      endIndex
    );
    console.log();
  }

  pageNumbers(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  onSelectChange(event: any) {
    // console.log('Selected value:', event.target.value);
    this.pageSize = Number(event.target.value);
    this.currentPage = 1;
    this.getPaginatedData();
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.pageNumbers();
  }
  // ===========================================================

  ngOnInit(): void {
    this.getApplicationAlllist();
    this.getAllCurrentList('all');
  }

  escalatepayload = {
    via: '',
    contactName: '',
    email: '',
    datetime: '',
  };

  getApplicationAlllist() {
    let user_Id = localStorage.getItem('user_id');
    this.dashboardService.getApplicationlist(user_Id).subscribe(
      (response: any) => {
        this.applicationList = response.serviceResponse;
        // console.log("applicationList---", this.applicationyList);
      },
      (error: any) => {
        // Handle the error
        console.error('Login error:', error);
      }
    );
  }

  getAllCurrentList(applicationName: any) {
    this.currentIsueeService.getApplicationlist(applicationName).subscribe(
      (response: any) => {
        console.log('response---', response);
        this.getallcurrentapplist = response.serviceResponse;
        this.totalItems = this.getallcurrentapplist.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.getListForPagination = this.getallcurrentapplist.slice(
          0,
          this.pageSize
        );
        // console.log("main ",this.totalItems);
        // console.log("main ",this.totalPages);
      },
      (error: any) => {
        console.log('error---', error);
      }
    );
  }

  getScreenShot(screenshotid: any) {
    this.isSreenshotmodal = true;

    const modalElement = document.getElementById('screenshotModal');

    this.currentIsueeService.getscreenshot(screenshotid).subscribe(
      (response: any) => {
        this.screenshotdata = response.serviceResponse;
        console.log('screenshot --', this.screenshotdata);
        console.log('screenshot3 --', this.screenshotdata[0][2]);
        this.screenshotUrl = this.convertBase64ToUrl(this.screenshotdata[0][2]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  isCurrentclosemodal() {
    this.isSreenshotmodal = false;
    this.screenshotUrl = '';
  }

  convertBase64ToUrl(base64: string): string {
    return `data:image/png/base64,${base64}`;
  }

  getLevelData(event: any) {
    console.log('checked ---', event.target.value);

    this.levels = [];
    this.nameslist = [];
    this.emailsList = [];
    const maxValue = parseInt(this.selectedLevel, 10);
    for (let i = 1; i <= maxValue; i++) {
      this.levels.push(String(i));
    }
    console.log('this.levels ---', this.levels);

    this.currentIsueeService
      .getContactInfo(this.selectedAppName, this.selectedpageName, this.levels)
      .subscribe(
        (response: any) => {
          response.serviceResponse.forEach((item: any) => {
            // this.nameslist.push(item[0]);
            this.emailsList.push(item[1]);
          });
          // console.log('namelist--', this.nameslist);
          console.log('emaillist--', this.emailsList);
        },
        (error: any) => {
          alert(error.serviceResponse);
        }
      );
  }

  skippedfunc(applicationName: string, pageName: string): void {
    const now = new Date();
    this.currentDateTime = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss')!;
    console.log(this.currentDateTime);
    console.log(applicationName);
    console.log(pageName);
    const isConfirmed = confirm('Are you sure you want to skipped ?');
    if (isConfirmed) {
      this.currentIsueeService
        .skipped(applicationName, pageName, this.currentDateTime)
        .subscribe((response: any) => {
          console.log(response.serviceResponse);
          alert(response.serviceResponse);
          this.getAllCurrentList('all');
        });

      console.log('The item was deleted.');
    } else {
      console.log('The delete action was canceled.');
    }
  }

  emailInfo: any;
  getEmailbytheUser(event: any) {
    console.log(event.target.value);
    this.SelectedContactIndex = event.target.value;
    this.selectedEmail = this.emailInfo[this.SelectedContactIndex][1];
    // console.log(this.selectedEmail);
  }

  // ===========================================================
  //                      ESCALATE Model
  // ===========================================================

  escalateModalOpen(
    selectedAppname: string,
    levels: string,
    selectedpaggename: any,
    datetime: any,
    seletedid: any
  ) {


   

    this.status = 'escalate';
    this.levels = [];
    this.isescalateModalopen = true;
    const now = new Date();
    this.currentDate = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss');
    console.log('dateTime --', this.currentDate);

    // console.log('currentdatime ',this.currentDate);

    this.selectedId = seletedid;
    console.log('selected id -', this.selectedId);
    this.selectedAppName = selectedAppname;
    this.selectedlevel = levels;
    this.selectedpageName = selectedpaggename;
    this.escalatepayload.datetime = datetime;
    let stringValue: string = String(levels);

    // this.Incremetlevetbyone = levels
    this.selectedLevel = String(levels + 1);
    const maxValue = parseInt(stringValue, 10);
    for (let i = 1; i <= maxValue; i++) {
      this.levels.push(String(i));
    }

    console.log('this.levels ---', this.levels);
    this.currentIsueeService
      .getContactInfo(this.selectedAppName, this.selectedpageName, this.levels)
      .subscribe((response: any) => {
        this.emailInfo = response.serviceResponse;
        response.serviceResponse.forEach((item: any) => {
          this.emailsList.push(item[1]);
        });
      });
  }

  Escaltemodalclose() {
    this.isescalateModalopen = false;
    this.levels = [];
    this.ccMail = '';
  }

  // ==========================================================
  //                 SOLVED Model
  // ==========================================================

  solvedModalopen(
    selectedAppname: string,
    levels: any,
    selectedpaggename: any,
    datetime: any
  ) {
    this.status = 'solved';

    this.isSovledmodalopen = true;
    this.escalatepayload.datetime = datetime;

    this.currentIsueeService
      .getContactInfo(selectedAppname, selectedpaggename, levels)
      .subscribe((response: any) => {
        this.emailInfo = response.serviceResponse;

        response.serviceResponse.forEach((item: any) => {
          this.emailsList.push(item[1]);
        });

        const now = new Date();
        this.currentDate = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss');

        // this.escalatepayload.contactName = this.getcontactInfolist[0][0];
        // this.escalatepayload.email = this.getcontactInfolist[0][1];

        // response.serviceResponse.forEach((item: any) => {
        // this.nameslist.push(item[0]);
        // this.emailsList.push(item[1]);
      });
  }

  solvedModalclose() {
    this.isSovledmodalopen = false;
  }

  // ================================================================
  //                           SELECT ALL
  //  ===============================================================

  onChange(id: any) {
    const index = this.selectedApplications.indexOf(id);

    // If the value exists in the array, remove it
    if (index !== -1) {
      this.selectedApplications.splice(index, 1); // Remove 1 element at index
    } else {
      this.selectedApplications.push(id);
    }
    console.log('selectedApplications', this.selectedApplications);
  }

  changeAll() {
    console.log(this.isSelectAll);
    if (this.isSelectAll == false) {
      this.isSelectAll = true;
      this.selectedApplications = [];
      this.getListForPagination.forEach((item) => {
        this.selectedApplications.push(item[0]);
      });
      console.log(this.selectedApplications);
    } else {
      this.isSelectAll = false;
      this.selectedApplications = [];
      console.log('empty List: ', this.selectedApplications);
    }
  }

  skipAllApplications() {
    console.log(this.isSkipAll, 'isSkip');
    if (this.isSkipAll) {
      console.log(this.selectedApplications);

      const now = new Date();
      this.currentDateTime = this.datePipe.transform(
        now,
        'yyyy-MM-dd HH:mm:ss'
      )!;
      console.log(this.currentDateTime);

      const isConfirmed = confirm('Are you sure you want to skip All ?');
      if (isConfirmed) {
        this.currentIsueeService
          .skipSelected(this.selectedApplications, this.currentDateTime)
          .subscribe((response: any) => {
            console.log(response.serviceResponse);
            alert(response.serviceResponse);
            this.getAllCurrentList('all');
          });

        console.log('The item was skipped.');
      } else {
        console.log('Delete action was canceled.');
      }
    } else {
      alert('Select SkipAll from the dropdown!');
    }
  }

  // =================================================
  //                   EMAIL Model
  // ==================================================

  subject: any;
  body: any;
  selectedFile: File | undefined;

  ccMail: any;
  ccEmailIds: any;
  concatenatedList!: string;

  emailmododalOpen() {

  if(this.selectedEmail == null || this.selectedEmail == '')
  {
    alert("Please select the ContactName !!!");
    return;
  }
    
    this.isEmailmodalopen = true;
    this.isescalateModalopen = false;
    this.isSovledmodalopen = false;

    this.currentIsueeService.getCCdetails().subscribe(
      (response: any) => {
        this.ccEmailIds = response.serviceResponse;

        this.emailsList.splice(this.SelectedContactIndex, 1);
        this.concatenatedList = this.emailsList.join(',');

        this.ccMail = this.ccEmailIds + ',' + this.concatenatedList;
      },
      (error:any) => {
        console.error('Error fetching CC details:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.formData.image = file;
    }
  }

  saveEmailData() {
    // console.log(this.selectedEmail);
    // console.log(this.ccMail);
    // console.log(this.subject);
    // console.log(this.body);
    // console.log(this.selectedAppName);
    // console.log(this.selectedpageName);
    const now = new Date();
    this.currentDateTime = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss')!;

    let userid = String(localStorage.getItem('user_id'));

    console.log('level ', this.selectedLevel);
    console.log('id ', this.selectedId);

    const formDataToSend = new FormData();
    formDataToSend.append('image', this.formData.image as File);
    formDataToSend.append('to', this.selectedEmail);
    formDataToSend.append('cc', this.ccMail);
    formDataToSend.append('body', this.body);
    formDataToSend.append('subject', this.subject);
    formDataToSend.append('applicationName', this.selectedAppName);
    formDataToSend.append('pageName', this.selectedpageName);
    formDataToSend.append('currentdateTime', this.currentDateTime);
    formDataToSend.append('levels', this.selectedLevel);
    formDataToSend.append('userId', userid);
    formDataToSend.append('status', this.status);

    this.currentIsueeService
      .sendEmailForEscalate(formDataToSend)
      .subscribe((response: any) => {
        alert(response.serviceResponse);
        this.selectedEmail = '';
        this.ccMail = '';
        this.body = '';
        this.subject = '';

        this.emailmododalclose();
        this.getAllCurrentList('all');
      });
  }

  emailmododalclose() {
    this.isEmailmodalopen = false;
    this.ccMail = '';
    this.body = '';
    this.subject = '';
    this.selectedEmail = '';
    this.emailInfo = [];
    // this.emailsList=[];
  }
}