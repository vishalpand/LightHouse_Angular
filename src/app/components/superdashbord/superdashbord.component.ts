import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import * as moment from 'moment';
import { SuperDashbordService } from 'src/app/services/super-dashbord.service';

export interface SuperDas {
  appName: string[];
  slowPages: any[];
  avgAvailbilty: any[];
}

@Component({
  selector: 'app-superdashbord',
  templateUrl: './superdashbord.component.html',
  styleUrls: ['./superdashbord.component.css']
})
export class SuperdashbordComponent implements OnInit {
  toDayDate: string;
  applicationList: any[] = [];
  filteredApplicationList: any[] = [];
  superDas: SuperDas = { appName: [], slowPages: [], avgAvailbilty: [] };
  startDate: string = '2024-06-29';
  endDate: string = moment().format("YYYY-MM-DD");
  showdata: string = "SBI_Cap_Securities_Off_Market_Web";
  isHovered: boolean[] = [];
  searchTerm: string = ''; // Add a search term model

  constructor(private dashboardService: DashbordService, private superDashbordService: SuperDashbordService) {
    this.toDayDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.getApplicationAlllist();
  }

  onMouseEnter(index: number): void {
    this.isHovered[index] = true;
  }

  onMouseLeave(index: number): void {
    this.isHovered[index] = false;
  }

  getApplicationAlllist(): void {
    const user_Id = localStorage.getItem('user_id');
    const starT = '00:00:00';
    const endT = '23:59:59';
    const formattedStartDate = `${this.startDate} ${starT}`;
    const formattedEndDate = `${this.endDate} ${endT}`;

    this.dashboardService.getApplicationlist(user_Id).subscribe(
      (response: any) => {
        this.applicationList = response.serviceResponse;
        this.filteredApplicationList = [...this.applicationList];
        this.isHovered = new Array(this.applicationList.length).fill(false);

        for (const appName of this.applicationList) {
          this.superDashbordService.getSlowPageData(appName, formattedStartDate, formattedEndDate).subscribe(
            (response: any) => {
              this.superDas.appName.push(appName);
              this.superDas.slowPages.push(response.serviceResponse);
            },
            (error: any) => {
              console.error('Error fetching slow page data:', error);
            }
          );

          this.superDashbordService.getavgAvailability(appName, formattedStartDate, formattedEndDate).subscribe(
            (response: any) => {
              this.superDas.avgAvailbilty.push(response.serviceResponse);
            },
            (error: any) => {
              console.error('Error fetching average availability:', error);
            }
          );
        }

        console.log('All data:', this.superDas.avgAvailbilty);
      },
      (error: any) => {
        console.error('Error fetching application list:', error);
      }
    );
  }

  // Method to filter the application list based on the search term
  filterApplications(): void {
    if (this.searchTerm) {
      this.filteredApplicationList = this.applicationList.filter(appName =>
        appName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredApplicationList = [...this.applicationList];
    }
  }
}
