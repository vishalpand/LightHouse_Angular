import { Component } from '@angular/core';

@Component({
  selector: 'app-supports',
  templateUrl: './supports.component.html',
  styleUrls: ['./supports.component.css']
})
export class SupportsComponent {
  email: string = '';
  application: string = '';
  subApplication: string = '';
  pageList: string[] = [];
  startDateTime: string='';
  endDateTime: string = '';
  
  errorDetails: string = '';

  selectAll(event: any): void {
    if (event.target.checked) {
      // If "Select All" checkbox is checked, select all options
      this.pageList = ['Home Page', 'Login Page','Signup Page'];
    } else {
      // If "Select All" checkbox is unchecked, deselect all options
      this.pageList = [];
    }
  }

  onOptionChange(event: any) {
    const selectedOption = event.target.value;
    if (!this.pageList.includes(selectedOption)) {
      this.pageList.push(selectedOption);
    } else {
      const index = this.pageList.indexOf(selectedOption);
      this.pageList.splice(index, 1);
    }
  }

  removeOption(option: string) {
    const index = this.pageList.indexOf(option);
    if (index !== -1) {
      this.pageList.splice(index, 1);
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
