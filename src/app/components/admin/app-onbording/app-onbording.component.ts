import { Component } from '@angular/core';
import { AppOnbor } from 'src/app/model/AppOnbordFormdata';
import { ApponBordService } from 'src/app/services/appon-bord.service';

@Component({
  selector: 'app-app-onbording',
  templateUrl: './app-onbording.component.html',
  styleUrls: ['./app-onbording.component.css']
})
export class AppOnbordingComponent {


  options1: string[] = [];

  options2: string[] = [];

  textInput: string = '';
  showOptions: boolean = false;
  userId: any
  getclientlistData:any



  file: File | undefined;


  constructor(private apponBord: ApponBordService) {

  }

  
  ngOnInit(): void {
    this.getClientData();
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }


  formData = {
    applicationName: '',
    userId: '',
    appPage_wise: '',
    platform: '',
    domainName: '',
    clientName: '',
    appurl: '',
    monitorurl: '',
    browsertype: '',
    apdexSatisfactory: '',
    startTime: '',
    endTime: '',
    apdexTolerable: '',
    ismarket: '',
    interval: '',
    file: null as File | null
  };


  Onbord() {


    if(this.formData.applicationName == null ||  this.formData.applicationName == '' ){
      alert("please select applicationName!!");
      return;
    }

    if(this.formData.platform == null ||  this.formData.platform == '' ){
      alert("please select platform!!");
      return;
    }


    if(this.formData.ismarket == null ||  this.formData.ismarket == '' ){
      alert("please select ismarket!!");
      return;
    }

    if(this.formData.appurl == null ||  this.formData.appurl == '' ){
      alert("please select appurl!!");
      return;
    }


    if(this.formData.monitorurl == null ||  this.formData.monitorurl == '' ){
      alert("please select monitoring url !!");
      return;
    }

    if(this.formData.browsertype == null ||  this.formData.browsertype == '' ){
      alert("please select browsertype !!");
      return;
    }

    if(this.formData.apdexSatisfactory == null ||  this.formData.apdexSatisfactory == '' ){
      alert("please select apdexSatisfactory !!");
      return;
    }



    if(this.formData.apdexTolerable == null ||  this.formData.apdexTolerable == '' ){
      alert("please select apdexTolerable !!");
      return;
    }


    if(this.formData.clientName == null ||  this.formData.clientName == '' ){
      alert("please select clientName !!");
      return;
    }



    if(this.formData.domainName == null ||  this.formData.domainName == '' ){
      alert("please select domainName !!");
      return;
    }

    if(this.formData.startTime == null ||  this.formData.startTime == '' ){
      alert("please select startTime !!");
      return;
    }


    if(this.formData.endTime == null ||  this.formData.endTime == '' ){
      alert("please select endTime !!");
      return;
    }

    if(this.formData.interval == null ||  this.formData.interval == '' ){
      alert("please select interval !!");
      return;
    }


    if(this.formData.file == null ){
      alert("please select file !!");
      return;
    }




    const formDataToSend = new FormData();
    this.userId = localStorage.getItem('user_id');
    formDataToSend.append('file', this.formData.file as File);
    formDataToSend.append('UserId', this.userId);
    formDataToSend.append('appName', this.formData.applicationName);
    formDataToSend.append('appType', this.formData.platform);
    formDataToSend.append('clientName', this.formData.clientName);
    formDataToSend.append('domainName', this.formData.domainName);
    formDataToSend.append('appUrl', this.formData.appurl);
    formDataToSend.append('monUrl', this.formData.monitorurl);
    formDataToSend.append('browserType', this.formData.browsertype);
    formDataToSend.append('satisfactory', this.formData.apdexSatisfactory);
    formDataToSend.append('tolerable', this.formData.apdexTolerable);
    formDataToSend.append('startDate', this.formData.startTime);
    formDataToSend.append('endDate', this.formData.endTime);
    formDataToSend.append('interval', this.formData.interval);
    formDataToSend.append('isMarket', this.formData.ismarket);
    this.apponBord.getimportapplicationData(formDataToSend).subscribe((response: any) => {

      if (response.serviceResponse == 'Success') {
        alert("Oborded SuccessFully ...!!!");
        this.formData = {
          applicationName: '',
          userId: '',
          appPage_wise: '',
          platform: '',
          domainName: '',
          clientName: '',
          appurl: '',
          monitorurl: '',
          browsertype: '',
          apdexSatisfactory: '',
          startTime: '',
          endTime: '',
          apdexTolerable: '',
          ismarket: '',
          interval: '',
          file: null as File | null
        };
      }

    }, (error: any) => {
      // Handle the error
      console.error('Login error:', error);
    });
  }

 getClientData(){
  this.apponBord.getClientList().subscribe((response: any) => {
    this.getclientlistData = response.serviceResponse;
    this.options1 =  this.getclientlistData ;
    console.log("client list data ", this.getclientlistData);
  });
 }


 getDomainByClientData(event:any){
   this.apponBord.getDomainByClient(event).subscribe((response: any) => {
    this.options2  = response.serviceResponse;
  
    console.log("client list data ", this.getclientlistData);
  });
 }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.formData.file = file;
    }
  }


  selectText(event: any) {

  }
}
