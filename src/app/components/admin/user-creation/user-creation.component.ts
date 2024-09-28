import { Component } from '@angular/core';

import { userCreation } from 'src/app/model/userCreation';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {

  usercretion: userCreation = new userCreation();

  isCreateUserModalOpen: boolean = false;
  isShowUserModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  isShowModalOpenperuser: boolean = false;
  applicationList: any;
  selectedOptions: any[] = [];
  showUsers: any;
  applicationperUser: any
  apllicationlistperUser: any;
  

  constructor(private userService: UserService) { }


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

  // Function to open Create User modal
  openCreateUserModal() {
    this.isCreateUserModalOpen = true;
    this.usercretion.userId = '';
    this.usercretion.userName = '';
    this.usercretion.emailid = '';
    this.usercretion.clientname = '';
    this.usercretion.passWord = '';
    this.usercretion.role = '';
  }

  // Function to close Create User modal
  closeCreateUserModal() {
    this.isCreateUserModalOpen = false;
  }

  updateopenUserModal(UpdateuserId: any,username:any,usermailid:any, roleId:any) {
    this.isShowUserModalOpen = false;
    this.isUpdateModalOpen = true;
    this.usercretion.userId = UpdateuserId;
    this.usercretion.userName =username;
    this.usercretion.emailid = usermailid;
  

    switch(roleId) {
      case 1:
        this.usercretion.role = 'admin';
        break;
      case 2:
        this.usercretion.role = 'user';
        break;
    }


  }


  UpdateUser() {


    if (this.usercretion.userName == '' || this.usercretion.userName == null) {
      alert('please enter userName..!')
      return;
    }

    if (this.usercretion.userId == '' || this.usercretion.userId == null) {
      alert('please enter userId..!')
      return;
    }

    if (this.usercretion.emailid == '' || this.usercretion.emailid == null) {
      alert('please enter emailId..!')
      return;
    }





    if (this.usercretion.role == '' || this.usercretion.role == null) {
      alert('please select User role..!')
      return;
    }


    if (this.selectedOptions == null) {
      alert('please select any application..!')
      return;
    }

    if (this.usercretion.appType == '' || this.usercretion.appType == null) {
      alert('please select appType..!')
      return;
    }

    this.userService.updateUser(this.usercretion, this.selectedOptions).subscribe((response: any) => {

      console.log(response.serviceResponse)
      if (response.serviceResponse == 'Success') {
        alert("User Update suceessfully..!!!");

        this.usercretion.appType = '';
        this.usercretion.userId = '';
        this.usercretion.userName = '';
        this.usercretion.clientname = '';
        this.usercretion.passWord = '';
        this.usercretion.role = '';
        this.usercretion.selMul = '';
        this.usercretion.emailid = '';
        this.selectedOptions = [];
      }

    }, (error: any) => {
      console.log(error.serviceError)
    }

    );

  }



  deleteUser(user_id: any) {

    this.userService.deleteUser(user_id).subscribe((response: any) => {
      console.log(response);

      if(response.serviceResponse == 'Success'){
        alert("User deleted successfuly...");
      }

      this.showUserdetails();
    } ,(error: any) => {
          console.log(error);
    }
  
  );


  }




  showModalperUser(user_id: any) {
    this.isShowModalOpenperuser = true;
    this.applicationperUser = user_id;

    this.userService.userlistPerUser(user_id).subscribe((response: any) => {

      // console.log(response);

      this.apllicationlistperUser = response.serviceResponse;
      console.log(this.apllicationlistperUser);


    }, (error: any) => {



    }

    )



  }



  closeModalperUser() {
    this.isShowModalOpenperuser = false;
  }


  updatecloseUserModal() {
    this.isUpdateModalOpen = false;
  }

  showUserdetails() {
    let roleid = localStorage.getItem('role_id');
    this.userService.showUser(roleid).subscribe((response: any) => {

      // console.log(response);

      this.showUsers = response.serviceResponse;
      console.log(this.showUsers);
    }, (error: any) => {



    }

    )
  }


  // Function to open Show User modal
  openShowUserModal() {
    this.isShowUserModalOpen = true;


    let roleid = localStorage.getItem('role_id');
    this.userService.showUser(roleid).subscribe((response: any) => {

      // console.log(response);

      this.showUsers = response.serviceResponse;
      this.getFilteredList=this.showUsers;
      console.log(this.showUsers);

    }, (error: any) => {



    }

    )


  }

  // Function to close Show User modal
  closeShowUserModal() {
    this.isShowUserModalOpen = false;
  }


  createUser() {

    if (this.usercretion.userName == '' || this.usercretion.userName == null) {
      alert('please enter userName..!')
      return;
    }

    if (this.usercretion.userId == '' || this.usercretion.userId == null) {
      alert('please enter userId..!')
      return;
    }

    if (this.usercretion.emailid == '' || this.usercretion.emailid == null) {
      alert('please enter emailId..!')
      return;
    }

    // if (this.usercretion.clientname == '' || this.usercretion.clientname == null) {
    //   alert('please enter emailId..!')
    //   return;
    // }


    if (this.usercretion.passWord == '' || this.usercretion.passWord == null) {
      alert('please enter password..!')
      return;
    }

    if (this.usercretion.role == '' || this.usercretion.role == null) {
      alert('please enter roleUser..!')
      return;
    }


    if (this.selectedOptions == null) {
      alert('please select any application..!')
      return;
    }

    if (this.usercretion.appType == '' || this.usercretion.appType == null) {
      alert('please enter appType..!')
      return;
    }

    this.userService.cretUser(this.usercretion, this.selectedOptions).subscribe((response: any) => {

      console.log(response.serviceResponse)
      if (response.serviceResponse == 'user created') {
        alert("User created suceessfully..!!!");

        this.usercretion.appType = '';
        this.usercretion.userId = '';
        this.usercretion.userName = '';
        this.usercretion.clientname = '';
        this.usercretion.passWord = '';
        this.usercretion.role = '';
        this.usercretion.selMul = '';
        this.usercretion.emailid = '';
        this.selectedOptions = [];
      }

      if (response.serviceStatus == 'User Already Registered') {
        alert("User Already Registered..!!!");

        this.usercretion.appType = '';
        this.usercretion.userId = '';
        this.usercretion.userName = '';
        this.usercretion.clientname = '';
        this.usercretion.passWord = '';
        this.usercretion.role = '';
        this.usercretion.selMul = '';
        this.usercretion.emailid = '';
        this.selectedOptions = [];
      }

    }, (error: any) => {
      console.log(error.serviceError)
    }


    )



  }



  selectAll(event: any): void {
    if (event.target.checked) {
      this.selectedOptions = [...this.applicationList];
    } else {
      this.selectedOptions = [];
    }
  }


  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  selectMultiple(event: any): void {
    const value = event.target.value;
    if (value && !this.selectedOptions.includes(value)) {
      this.selectedOptions.push(value);
    }
    event.target.value = '';
  }

  removeOption(option: string): void {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option);
  }


  // =============SEARCH FUNCTIONS===================
  filterValue!: string;
  getFilteredList:any;

  applyFilter(){

    let filteredItems = this.filterValue ? this.filterItems(this.filterValue) : [...this.showUsers];
    console.log(this.filterValue)
    console.log("filteredItems",filteredItems)

    this.getFilteredList = filteredItems;

  }


  filterItems(filterValue: string): any[] {
  
    filterValue = filterValue.trim().toLowerCase();
  
    return this.showUsers.filter((user: any) => {
      
      return Object.keys(user).some(key => {
        let cellValue = user[key];
  
        // Check if cellValue is string and matches filterValue
        if (typeof cellValue === 'string') {
          return cellValue.trim().toLowerCase().includes(filterValue);
        }
        
        return false; // Ignore non-string values for filtering
      });
    });
  
   }
get filteredItems(): any[] {
  return this.filterValue ? this.filterItems(this.filterValue) : [...this.showUsers];
}



}

