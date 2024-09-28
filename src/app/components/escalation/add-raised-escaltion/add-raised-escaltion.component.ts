import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AddraisedIssueService } from 'src/app/services/addraised-issue.service';
import { CurrentIsueeService } from 'src/app/services/current-isuee.service';
import { DashbordService } from 'src/app/services/dashbord.service';
import { HarstatusService } from 'src/app/services/harstatus.service';
import { UserService } from 'src/app/services/user.service';

interface UserDetails {
  userName: string;
  appName: string;
  pages: string;
  dateTime: string;
  levels: string;
  comments: string;
  via: string;
  reportedTo: string
}



@Component({
  selector: 'app-add-raised-escaltion',
  templateUrl: './add-raised-escaltion.component.html',
  styleUrls: ['./add-raised-escaltion.component.css']
})
export class AddRaisedEscaltionComponent {



  addraisedEscaltionlist: any;

  isSreenshotmodal: Boolean = false;
  pickIndexNumberbyuser: any;

  getAlluserList: string[] = [];
  applicationList: any
  pageList: string[] = [];

  screenshotdata: any
  screenshotUrl: any

  filedata: File | undefined;

  subjectdata: string = '';
  bodydata: string = '';

  emailccdetailslist: any







  AdduserDetails: UserDetails = {
    userName: '',
    appName: '',
    pages: '',
    dateTime: '',
    levels: '1',
    comments: '',
    via: 'email',
    reportedTo: ''
  }


  nameslist: string[] = [];
  emailslist: string[] = [];
  isEmailmodalopen: boolean = false;
  selectEmailbyuser: string = '';

  constructor(private addraisdservice: AddraisedIssueService, 
    private currentIsueeService: CurrentIsueeService, private userService: UserService,
     private dashboardService: DashbordService, private harstatusServ: HarstatusService, private datepipe: DatePipe) {

  }



  ngOnInit(): void {
    this.getOnEscalationAdded();
    this.getAllUsers();
    this.getApplicationAlllist();

  }



  getOnEscalationAdded() {

    this.addraisdservice.getOnEscalationAddedIssues().subscribe((data: any) => {
      this.addraisedEscaltionlist = data.serviceResponse;
      console.log(this.addraisedEscaltionlist);
    })
  }




  getScreenShot(screenshotid: any) {
    this.isSreenshotmodal = true;

    const modalElement = document.getElementById('screenshotModal');

    this.currentIsueeService.getscreenshot(screenshotid).subscribe((response: any) => {
      this.screenshotdata = response.serviceResponse;
      console.log("screenshot --", this.screenshotdata)
      console.log("screenshot3 --", this.screenshotdata[0][2]);
      this.screenshotUrl = this.convertBase64ToUrl(this.screenshotdata[0][2]);

    }, (error: any) => {
      console.log(error);
    }
    )

  }


  convertBase64ToUrl(base64: string): string {
    return `data:image/png;base64,${base64}`;
  }



  isCurrentclosemodal() {
    this.isSreenshotmodal = false;
    this.screenshotUrl = '';

  }


  getAllUsers() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.getAlluserList = response.serviceResponse;
    }, (error: any) => {
      console.log(error);
    }
    );
  }



  getApplicationAlllist() {
    let user_Id = localStorage.getItem('user_id');
    this.dashboardService.getApplicationlist(user_Id)
      .subscribe((response: any) => {
        this.applicationList = response.serviceResponse;

        console.log("applicationList---", this.applicationList);
      }, (error: any) => {
        // Handle the error
        console.error('Login error:', error);
      });
  }


  getAllpage(applicatiName: any) {

    this.harstatusServ.getharStatusData(applicatiName).subscribe((response: any) => {
      this.pageList = response.serviceResponse;
      // localStorage.setItem('appName', this.applicationList[0]);
      console.log("harStatuslist---", this.pageList);
    }, (error: any) => {
      // Handle the error
      console.error('Login error:', error);
    });
  }


  getEscalationdetails(event: any) {

    this.emailslist = [];
    this.nameslist = [];
    this.currentIsueeService.getContactInfo(this.AdduserDetails.appName, event, '1').subscribe((response: any) => {

      console.log('escala', response.serviceResponse);

      if (response.serviceResponse == null || response.serviceResponse == '') {
        alert("Data Not Found !!...")

      } else {
        response.serviceResponse.forEach((item: any) => {
          this.nameslist.push(item[0]);
          this.emailslist.push(item[1]);
        });
        console.log('namelist--', this.nameslist);
        console.log('emaillist--', this.emailslist);
      }


    }, (error: any) => {
      alert(error.serviceResponse);
    }
    );

  }



  checkifEscalationExits() {
 
    if(this.AdduserDetails.userName==''){
      alert("Select User Name?");
      return;
    }

    if(this.AdduserDetails.appName==''){
      alert("Select Application Name?");
      return;
    }

    if(this.AdduserDetails.pages==''){
      alert("Select Page Name?");
      return;
    }

    if(this.AdduserDetails.comments==''){
      alert("Add error Description?");
      return;
    }

    if(this.AdduserDetails.reportedTo==''){
      alert("Select Reported To?");
      return;
    }


    console.log(this.AdduserDetails);

    this.addraisdservice.ckeckifEscalationsExits(this.AdduserDetails.appName, this.AdduserDetails.pages).subscribe(
      (response: any) => {

        // console.log('ckeck--', response)
        // alert(response.serviceResponse);

        if (response.serviceResponse == 'No Escaltion  Exists') {
          this.isEmailmodalopen = true;
          this.getCCdetails();

        }

        if (response.serviceResponse == 'Escalation Already Exists!') {
            alert(response.serviceResponse);
            
        }
      }, (error: any) => {
        alert(error.serviceResponse);
      }
    );

  }

  getEmailbytheUser(event: any) {
    console.log("event ---", event);
    let indexnum = this.nameslist.indexOf(event);
    console.log("event ---", indexnum)
    this.pickIndexNumberbyuser = indexnum;
    this.selectEmailbyuser = this.emailslist[indexnum];


  }


  emailmododalclose() {
    this.isEmailmodalopen = false;
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // this.formData.file = file;
      this.filedata = file;
    }
  }


  saveEmailData() {

    if(this.filedata == null && this.filedata == undefined){
      alert("Please attchaed documents !!!");
      return;
    }

    const now = new Date();
    const currentTimeandDate = this.datepipe.transform(now, 'yyyy-MM-dd HH:mm:ss')
    this.getCCdetails();
    const formDataToSend = new FormData();
    formDataToSend.append('to',this.selectEmailbyuser);
    formDataToSend.append('cc', this.emailccdetailslist);
    formDataToSend.append('subject', this.subjectdata);
    formDataToSend.append('body', this.bodydata);
    if (this.filedata){
      formDataToSend.append('image', this.filedata);
    }

    formDataToSend.append('applicationName', this.AdduserDetails.appName);
    formDataToSend.append('pageName', this.AdduserDetails.pages);
    formDataToSend.append('currentdateTime', String(currentTimeandDate));
    formDataToSend.append('levels', '1');
    formDataToSend.append('comments', this.AdduserDetails.comments);
    formDataToSend.append('userName', String(localStorage.getItem('user_name')));
    formDataToSend.append('userId', String(localStorage.getItem('user_id')));

    console.log('**********', formDataToSend);

    this.addraisdservice.saveEmailData(formDataToSend).subscribe(
      (response: any) => {
        if (response.serviceResponse == 'Mail Send successfully...!') {
          alert(response.serviceResponse);
          this.bodydata = '';
          this.subjectdata = '';
          this.isEmailmodalopen = false;
          this.filedata = undefined; 



          //clear escalation form
          this.AdduserDetails = {
            userName: '',
            appName: '',
            pages: '',
            dateTime: '',
            levels: '1',
            comments: '',
            via: 'email',
            reportedTo: ''
          };


        }

      }, (error: any) => {
        alert(error.serviceResponse);
      }
    );




  }



  getCCdetails() {
    this.currentIsueeService.getCCdetails().subscribe((response: any) => {
      this.emailccdetailslist = response.serviceResponse;

      const cclistArray = this.emailccdetailslist.split(',');

      this.emailccdetailslist = this.emailslist.concat(cclistArray);
      console.log('emailccdetailslist', this.emailccdetailslist);

      // console.log('#################', this.emailccdetailslist);
    });


  }

}

