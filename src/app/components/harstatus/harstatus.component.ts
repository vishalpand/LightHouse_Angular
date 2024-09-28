import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashbordService } from 'src/app/services/dashbord.service';
import { HarstatusService } from 'src/app/services/harstatus.service';

@Component({
  selector: 'app-harstatus',
  templateUrl: './harstatus.component.html',
  styleUrls: ['./harstatus.component.css']
})
export class HarstatusComponent {
  showTable: boolean = false;
  @ViewChild('harEdit') harEdit: any;
  // appName: any = localStorage.getItem('appName');

  applicationList: any;
  toDayDate: any;
  harStatuslist: any;
  applicatiName: string='';
  updateSuccess: any;
  updateFail: any;
  id: any;
  page: any;
  harflag: any

  constructor(private dashboardService: DashbordService, private harstatusServ: HarstatusService, private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService) {
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


  getAllharData(applicatiName: any) {

    this.harstatusServ.getharStatusData(applicatiName)
      .subscribe((response: any) => {
        this.harStatuslist = response.serviceResponse;
        // localStorage.setItem('appName', this.applicationList[0]);
        console.log("harStatuslist---", this.harStatuslist);
      }, (error: any) => {
        // Handle the error
        console.error('Login error:', error);
      });
  }


  OpenUpdatemodal(Id: any, pagename: any, harFlag: any) {
    if (this.harEdit) {
      this.harEdit.nativeElement.classList.add('show');
      this.harEdit.nativeElement.style.display = 'block';
    }

    this.id = Id;
    this.page = pagename;
    this.harflag = harFlag;

  }





  closeupadatemodal() {
    if (this.harEdit) {
      this.harEdit.nativeElement.classList.remove('show');
      this.harEdit.nativeElement.style.display = 'none';
    }
  }


  updateHarstatusData() {

    this.harstatusServ.updateHarData(this.id, this.harflag, this.page).subscribe(
      (response: any) => {

        // if (response.serviceResponse == 'Success') {
          // alert("Update SuccessFully...!!!");
          this.updateSuccess=response.serviceResponse;
        // }
        this.getAllharData(this.applicatiName);

      },
      (error:any)=>{
        this.updateFail=error.serviceResponse;
      }
    )
  }

}
