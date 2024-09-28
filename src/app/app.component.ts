import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';
import { LoginForm } from './model/LoginForm';
import { UserService } from './services/user.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LightHous-Angular';


 

  loginForm: LoginForm = new LoginForm();

  @ViewChild('profilepage') profilepage: any
  showSubLinksForHome: boolean = false;
  showSubLinksForSupport: boolean = false;
  showSubLinksForAdmin: boolean = false;
  showSubLinksForReport :boolean=false;
  showSubLinksForEscalation:boolean=false;

  cshow: boolean = false;
  newshow:boolean=false;
  isconfirmShow:boolean=false;


  isIconHome:any
  isIconAdmin:any
  isIconReport:any
  isIconSupport:any
  isIconEscalation:any

  currentPass:string='';
  iscurrentPassstr:any;
  isflage:boolean=false;


  newpassword:string='';
  confirmPassword:string='';
  newPassstr:string='';
  confirmPassstr:string='';


  isSidebarOpen: boolean = false;

  constructor(private router: Router,private sharedService:SharedService,private userSer:UserService) { }

  // isLoggedIn: boolean=false;
  // isUserLogged: any = localStorage.getItem('is_active');
  user_name: any = localStorage.getItem('user_name');

  

  
  ngOnInit() {
   

  }

  isLoggedIn(): boolean {
    // Retrieve the value from localStorage
    return localStorage.getItem('is_active') === 'Y';
  }

yes:boolean=false;
  btntoogle(){
   this.yes=true;
}


alertType: string | null = null;

showAlert(type: string) {
  this.alertType = type;
  setTimeout(() => {
    this.alertType=null;
  }, 2000);
}



  // Function to toggle the sidebar
  toggleNav() {
    this.isIconHome="Home";
    this.isIconAdmin="Admin";
    this.isIconReport="Report";
    this.isIconSupport="Support";
    this.isIconEscalation="Escalation";

    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    if (sidebar && main) {
      if (sidebar.style.width === "193px") {
        sidebar.style.width = "49px";
        main.style.marginLeft = "49px";
        main.style.width = "calc(100% - 49px)";
      } else {
        sidebar.style.width = "193px";
        main.style.marginLeft = "193px";
        main.style.width = "calc(100% - 193px)";
      }
    }
  }

  toggleNavMouseleave(){

    this.isIconHome="";
    this.isIconAdmin="";
    this.isIconReport="";
    this.isIconSupport="";
    this.isIconEscalation="";  

    
    this.showSubLinksForHome=false;
    this.showSubLinksForAdmin=false;
    this.showSubLinksForReport=false;
    this.showSubLinksForSupport=false;
    this.showSubLinksForEscalation=false;

    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    if (sidebar && main) {
      if (sidebar.style.width === "193px") {
        sidebar.style.width = "49px";
        main.style.marginLeft = "49px";
        main.style.width = "calc(100% - 49px)";
      } else {
        sidebar.style.width = "193px";
        main.style.marginLeft = "193px";
        main.style.width = "calc(100% - 193px)";
      }
    }
  }



  

  logout() {
    localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }


  openProfilemodal() {
    if (this.profilepage) {
      this.profilepage.nativeElement.classList.add('show');
      this.profilepage.nativeElement.style.display = 'block';
    }
  }

  closeProfilemodal() {
    
    this.iscurrentPassstr='';
    this.newpassword='';
    this.confirmPassword='';
    this.currentPass='';
    this.cshow=false;
    this.newshow=false;
    this.isconfirmShow=false;

    if (this.profilepage) {
      this.profilepage.nativeElement.classList.remove('show');
      this.profilepage.nativeElement.style.display = 'none';
    }
  }


 
  
 

  // Method to toggle the visibility of sub-links for Home
  toggleSubLinksForHome(): void {
      this.showSubLinksForHome = !this.showSubLinksForHome;
      const sidebar = document.getElementById("mySidebar");
      const main = document.getElementById("main");
      if (sidebar && main) {
        if (sidebar.style.width === "193px") {
          // sidebar.style.width = "49px";
          // main.style.marginLeft = "49px";
          // main.style.width = "calc(100% - 49px)";
        } else {
          sidebar.style.width = "193px";
          main.style.marginLeft = "193px";
          main.style.width = "calc(100% - 193px)";
        }
      }
  }

  toggleSubLinksForSupport(): void {
    this.showSubLinksForSupport = !this.showSubLinksForSupport;
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    if (sidebar && main) {
      if (sidebar.style.width === "193px") {
        // sidebar.style.width = "49px";
        // main.style.marginLeft = "49px";
        // main.style.width = "calc(100% - 49px)";
      } else {
        sidebar.style.width = "193px";
        main.style.marginLeft = "193px";
        main.style.width = "calc(100% - 193px)";
      }
    }
}

  toggleSubLinksForAdmin(): void {
    this.showSubLinksForAdmin = !this.showSubLinksForAdmin;
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    if (sidebar && main) {
      if (sidebar.style.width === "193px") {
        // sidebar.style.width = "49px";
        // main.style.marginLeft = "49px";
        // main.style.width = "calc(100% - 49px)";
      } else {
        sidebar.style.width = "193px";
        main.style.marginLeft = "193px";
        main.style.width = "calc(100% - 193px)";
      }
    }
}


toggleSubLinksForReport(){
  this.showSubLinksForReport=!this.showSubLinksForReport;
  const sidebar = document.getElementById("mySidebar");
  const main = document.getElementById("main");
  if (sidebar && main) {
    if (sidebar.style.width === "193px") {
      // sidebar.style.width = "49px";
      // main.style.marginLeft = "49px";
      // main.style.width = "calc(100% - 49px)";
    } else {
      sidebar.style.width = "193px";
      main.style.marginLeft = "193px";
      main.style.width = "calc(100% - 193px)";
    }
  }


}



toggleSubLinksForEscalation(){
  this.showSubLinksForEscalation=!this.showSubLinksForEscalation;
  const sidebar = document.getElementById("mySidebar");
  const main = document.getElementById("main");
  if (sidebar && main) {
    if (sidebar.style.width === "193px") {
      // sidebar.style.width = "49px";
      // main.style.marginLeft = "49px";
      // main.style.width = "calc(100% - 49px)";
    } else {
      sidebar.style.width = "193px";
      main.style.marginLeft = "193px";
      main.style.width = "calc(100% - 193px)";
    }
  }


}


upDatepassword() {
  // const alphanumericPattern = /^[a-zA-Z0-9]{5,}$/;

  if (this.newpassword == null || this.newpassword == '') {
    alert('New Password is required');
    return;
  }

 

  if (this.confirmPassword == null || this.confirmPassword == '') {
    alert('Confirm Password is required');
    return;
  }


  if (this.newpassword !== this.confirmPassword) {
    alert('New Password and Confirm Password do not match');
    return;
  }



  if (this.newpassword.length < 5 && this.confirmPassword.length < 5 ) {
    alert('new password and confirmpassword  must be 5 character.');
    return;
  }   

  if(this.newpassword.length < 5 || this.confirmPassword.length < 5  ){
    alert('password must be 5 character.');
    return;
  }
 

  this.loginForm.user_id = localStorage.getItem('user_id');
  this.loginForm.password = this.confirmPassword;

  if (this.isflage) {
    this.userSer.upDatepassword(this.loginForm).subscribe(
      (response: any) => {
        if (response.serviceResponse === "Password changed") {
          alert("Password Changed Successfully!");
          this.iscurrentPassstr='';
          this.newpassword='';
          this.confirmPassword='';
          this.currentPass='';

        }

      },
      (error: any) => {
        alert(error.serviceError);
      }
    );
  }
}


ctoggleeyepassword() {
  this.cshow = !this.cshow;
}


newshoweyepass(){
  this.newshow=!this.newshow;
}
 

confimShow(){
 this.isconfirmShow=!this.isconfirmShow;
}

currentpasschecking(event:any){



  this.currentPass=event.target.value;
  this.loginForm.user_id=localStorage.getItem('user_id');
  this.loginForm.password=this.currentPass;

  this.userSer.Checkcurrentpass(this.loginForm).subscribe(
    
    (response: any) => {
      if(response.serviceResponse == "Invalid password"){
        this.iscurrentPassstr="Invalid Current Password";
      } 
      if(response.serviceResponse == "matched"){
        this.isflage=true;
        this.iscurrentPassstr='';
      }

  },
  (error: any) =>{
    alert(error.serviceError);
  }
   

)



}


}
