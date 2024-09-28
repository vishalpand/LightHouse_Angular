import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { AddEscalationsService } from 'src/app/services/add-escalations.service';
import { DashbordService } from 'src/app/services/dashbord.service';
import { HarstatusService } from 'src/app/services/harstatus.service';

@Component({
  selector: 'app-add-escalation',
  templateUrl: './add-escalation.component.html',
  styleUrls: ['./add-escalation.component.css'],
})
export class AddEscalationComponent {
  isPages: boolean = false;

  pages: any;
  selected: any[] = [];
  // selectedOption: any;

  applicationList: any;
  level: any;
  appName: string = '';
  fullName: string = '';
  appNameForCreation: string = '';
  level1: string = '';
  level2: string = '';
  level3: string = '';
  level4: string = '';
  level5: string = '';
  level6: string = '';
  level7: string = '';
  email: string = '';
  oldAppName: string = '';
  newAppName: string = '';

  addecalationslevellist: any;

  constructor(
    private dashboardService: DashbordService,
    private addescalations: AddEscalationsService,
    private harstatusService: HarstatusService
  ) {}

  ngOnInit(): void {
    this.getApplicationAlllist();
  }

  isDisplayed:boolean=false;
  editAppName() {
    if (this.oldAppName == '') {
      alert("Choose an application to edit ");
      this.isDisplayed=false;
    }else{
      this.isDisplayed=true;
    }    
  } 

  changeAppName() {
    this.addescalations
      .editInstanceName(this.oldAppName, this.newAppName)
      .subscribe(
        (response: any) => {
          alert(response.serviceResponse);
          location.reload();
          // this.pages = response.serviceResponse;
          // console.log("pages List---", this.pages);
        },
        (error: any) => {
          // Handle the error
          console.error('Login error:', error);
        }
      );
  }

  showPages() {
    this.isPages = true;
    this.selected = [];
    console.log('option' + this.appNameForCreation);
    let appName = this.appNameForCreation;
    this.addescalations.getPagesByApplication(appName).subscribe(
      (response: any) => {
        this.pages = response.serviceResponse;
        console.log('pages List---', this.pages);
      },
      (error: any) => {
        // Handle the error
        console.error('Login error:', error);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer == event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getApplicationAlllist() {
    let user_Id = localStorage.getItem('user_id');
    this.dashboardService.getApplicationlist(user_Id).subscribe(
      (response: any) => {
        this.applicationList = response.serviceResponse;
      },
      (error: any) => {
        // Handle the error
        console.error('Login error:', error);
      }
    );
  }

  getAllEscalationLevel() {
    this.addescalations
      .getaddescalationslevel(this.appName, this.level)
      .subscribe(
        (response: any) => {
          this.addecalationslevellist = response.serviceResponse;

          console.log('addecalationslevellist', this.addecalationslevellist);
        },
        (error: any) => {
          // Handle the error
          console.error('Login error:', error);
        }
      );
  }

  addAndRemove(add: any) {
    if (add) {
      // this.selected.concat(this.pages);
      let concatenatedArray = [].concat(...this.selected, ...this.pages);
      this.selected = concatenatedArray;
      this.pages = [];
    } else {
      let concatenatedArray = [].concat(...this.selected, ...this.pages);
      this.pages = concatenatedArray;
      this.selected = [];
    }
  }

  createEscalation() {
    console.log('appname',this.appNameForCreation);
    console.log('pages', this.selected);
    console.log('levels', this.level1, this.level2, this.level3);
    console.log('email', this.email);
    console.log('fullname', this.fullName);
    this.addescalations
      .createEscalationLevel(
        this.appNameForCreation,
        this.selected,
        this.fullName,
        this.email,
        this.level1,
        this.level2,
        this.level3,
        this.level4,
        this.level5,
        this.level6,
        this.level7
      )
      .subscribe(
        (response: any) => {
          alert(response.serviceResponse);
          this.isPages = false;
          // pageNames that are selected
          this.selected = []; 

          this.appNameForCreation='';
        this.fullName='';
        this.email='';
        this.level1='';
        this.level2='';
        this.level3='';
        this.level4='';
        this.level5='';
        this.level6='';
        this.level7='';
        },
        (error: any) => {
          // Handle the error

          console.error('Login error:', error);
        }
      );
  }

  // ================EDIT ESCALATION================
  EditEscalation = {
    appName: '',
    pageName: '',
    level: '',
    name: '',
    email: '',
    id: '',
  };

  editEscalation(
    id: any,
    appName: any,
    pageName: any,
    level: any,
    name: any,
    email: any
  ) {
    console.log(id, appName, pageName, level, name, email);
    this.EditEscalation.id = id;
    this.EditEscalation.appName = appName;
    this.EditEscalation.pageName = pageName;
    this.EditEscalation.level = level;
    this.EditEscalation.name = name;
    this.EditEscalation.email = email;
  }

  isMessage: boolean = false;
  message: any;

  onUpdateEscalation() {
    this.addescalations
      .editEscalationDetails(
        this.EditEscalation.id,
        this.EditEscalation.appName,
        this.EditEscalation.name,
        this.EditEscalation.email,
        this.EditEscalation.level
      )
      .subscribe(
        (response: any) => {
          this.message = response.serviceResponse;
          this.isMessage = true;
          
        },
        (error: any) => {
          // Handle the error

          console.error('Login error:', error);
        }
      );
  }

  closeModal(){
    this.isMessage = false;
    
  }

  // ======================DELETE ESCALATION===========================

  onDelete(id: any, appName: any, pageName: any) {
    const isDelete=confirm(`Do you want to delete escalation for ${appName}?`);
    console.log(isDelete);
    if(isDelete==true){
      this.addescalations.deleteEscalationDetails(id)
      .subscribe(
        (response: any) => {
          alert(response.serviceResponse);
        },
        (error: any) => {
          // Handle the error

          console.error('Error:', error);
        }
      );
    }
  }
}