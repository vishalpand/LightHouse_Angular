import { ChangeDetectorRef, Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HarstatusService } from 'src/app/services/harstatus.service';
import { SheduledowntimeService } from 'src/app/services/sheduledowntime.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  email: string = '';
  application: any;
  subApplication: any;
  pageList: string[] = [];
  startDateTime: string = '';
  endDateTime: string = '';
  ApplicationTypelist: any;
  instanceNametypelist: any;
  applicationType: any
  pagelistName: string[] = [];

  errorDetails: string = '';

  applicationList: any;



  constructor(private userService: UserService, private harstatusServ: HarstatusService, private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService, private sheduledown: SheduledowntimeService) {

  }


  ngOnInit(): void {
    this.getApplicationAlllist();


  }



  getApplicationAlllist() {
    let user_Id = localStorage.getItem('user_id');
    this.userService.getApplicationlist()
      .subscribe((response: any) => {
        this.applicationList = response.serviceResponse;


      }, (error: any) => {
        // Handle the error
        console.error('Login error:', error);
      });


  }


  // getAllharData() {

  //   this.harstatusServ.getharStatusData(this.application)
  //     .subscribe((response: any) => {
  //       this.harStatuslist = response.serviceResponse;
  //       // localStorage.setItem('appName', this.applicationList[0]);
  //       console.log("harStatuslist---", this.harStatuslist);
  //     }, (error: any) => {
  //       // Handle the error
  //       console.error('Login error:', error);
  //     });
  // }

  getApplicationType(applicationName: any) {



    this.sheduledown.getApplicationtype(applicationName)
      .subscribe((response: any) => {
        this.ApplicationTypelist = response.serviceResponse;
        console.log("application type -----", this.ApplicationTypelist);
        // this.ApplicationTypelist='';
        let tempvalue;
        if (this.ApplicationTypelist.length === 1) {
          tempvalue = this.ApplicationTypelist[0];
          // this.applicationType=this.ApplicationTypelist[0];
        }

        this.getInstanceNameType(this.application, tempvalue);



        this.instanceNametypelist = [];
      }, (error: any) => {
        console.error('Error fetching application type:', error);
      });

    console.log("test--", this.applicationType);
    this.getPagelistData();

  }





  getInstanceNameType(applicationName: any, applicationType: any) {

    this.sheduledown.getInstanceNametype(applicationName, applicationType)
      .subscribe((response: any) => {
        this.instanceNametypelist = response.serviceResponse;
        console.log("instanceNametypelist type -----", this.instanceNametypelist);

      }, (error: any) => {
        console.error('Error fetching instanceNametypelist type:', error);
      });
  }


  getPagelistData() {
    this.harstatusServ.getharStatusData(this.application)
      .subscribe((response: any) => {


        let pageListResponse: any;
        pageListResponse = response.serviceResponse;

        pageListResponse.forEach((element: string[]) => {

          this.pageList.push(element[1]);
        });

        console.log("ckeck finaldata", this.pagelistName)
        console.log("pageList---", this.pageList);
      }, (error: any) => {
        // Handle the error
        console.error('Login error:', error);
      });

  }

  selectAll(event: any): void {
    if (event.target.checked) {
      this.pagelistName = this.pageList;

    } else {

      this.pagelistName = [];
    }
  }

  onOptionChange(event: any) {
    const selectedOption = event.target.value;
    if (this.pageList.includes(selectedOption)) {
      this.pagelistName.push(selectedOption);
    }
  }

  removeOption(option: string) {
    const index = this.pagelistName.indexOf(option);
    if (index !== -1) {
      this.pagelistName.splice(index, 1);
    }
  }




  submitForm() {
    console.log('Email:', this.email);
    console.log('Application:', this.application);
    console.log('Sub-Application:', this.subApplication);
    console.log('Page List:', this.pageList);
    console.log('Start Date & Time:', this.startDateTime);
    console.log('End Date:', this.endDateTime);
    console.log('Error Details:', this.errorDetails);

  }
}
