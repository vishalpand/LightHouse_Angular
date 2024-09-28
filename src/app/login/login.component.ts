import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginForm } from 'src/app/model/LoginForm';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from '../services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('otpModal') otpModal: any;
  loginForm: LoginForm = new LoginForm(); // Initialize loginForm using LoginForm model

  constructor(private router: Router, private loginService: LoginService, private route: ActivatedRoute, private sharedService: SharedService, private spinner: NgxSpinnerService) { }



  ngOnInit(): void {
    // Ignore cacheBuster query parameter
    localStorage.clear();
  }

  openOTPModal() {
    if (this.otpModal) {
      this.otpModal.nativeElement.classList.add('show');
      this.otpModal.nativeElement.style.display = 'block';
    }
  }

  closeOTPModal() {
    if (this.otpModal) {
      this.otpModal.nativeElement.classList.remove('show');
      this.otpModal.nativeElement.style.display = 'none';
    }
  }

  login() {
    // this.spinner.show();
    console.log("username-", this.loginForm.user_id);
    console.log("password --", this.loginForm);



    // Call the login method of loginService with loginForm as parameter
    this.loginService.login(this.loginForm)
      .subscribe((response: any) => {
        // Handle the response
        console.log('Login response:', response);
        // Navigate to the dashboard or perform any other action based on the response
        if (response.serviceResponse != null && response.serviceStatus == "Success") {
          // setTimeout(() => {
          //   this.spinner.hide();
          // }, 5000);

          localStorage.clear();
          localStorage.setItem('user_id', response.serviceResponse.user_id);
          localStorage.setItem('user_name', response.serviceResponse.user_name);
          localStorage.setItem('password', response.serviceResponse.password);
          localStorage.setItem('is_active', response.serviceResponse.is_active);
          localStorage.setItem('mail_id', response.serviceResponse.mail_id);
          localStorage.setItem('corporate_name', response.serviceResponse.corporate_name);
          localStorage.setItem('phone_number', response.serviceResponse.phone_number);
          localStorage.setItem('role_id', response.serviceResponse.role_id);
          localStorage.setItem('domain', response.serviceResponse.domain);
          localStorage.setItem('plan', response.serviceResponse.plan);
          localStorage.setItem('count', response.serviceResponse.count);

          // this.sharedService.setLoggedIn(true);


          this.router.navigate(['/ApmosysAngularMonitoringPortal/Dashboard']).then(() => {
            window.location.reload();
          });
          // this.router.navigate(['ApmosysMonitoringPortal/Dashboard']);
        } else {
          alert(response.serviceError);
        }

      }, (error: any) => {
        // Handle the error
        console.error('Login error:', error);
      });
  }

}
