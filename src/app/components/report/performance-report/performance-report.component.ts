import { ChangeDetectorRef, Component } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashbordService } from 'src/app/services/dashbord.service';
import { PerformanceService } from 'src/app/services/performance.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-performance-report',
  templateUrl: './performance-report.component.html',
  styleUrls: ['./performance-report.component.css']
})
export class PerformanceReportComponent {
  
  toDayDate:any
  appName: any = localStorage.getItem('appName');
  startDate: any = moment().format("YYYY-MM-DD"); 
  startTime: any = '00:00:00';
  endDate: any = moment().format("YYYY-MM-DD");;
  endTime: any = '23:59:59';
  getAllperformancelist:any
  filename: string='';


  applicationList:any;
  constructor(private dashboardService: DashbordService, private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService,private perform:PerformanceService) {
    this.toDayDate = new Date().toISOString().split('T')[0];
  }



  ngOnInit(): void {
    this.getApplicationAlllist();
    let applicatiname = localStorage.getItem('appName');
    let startD = moment().format("YYYY-MM-DD");
    let endD = moment().format("YYYY-MM-DD");
    let starT = '00:00:00';
    let endT = '23:59:59';
    this.getPerformance(applicatiname, startD, endD, starT, endT);
   

  }
  getPerformance(appName: any, startD: any, endD: any, starT: any, endT: any) {
    this.spinner.show();
    startD = startD + ' ' + starT;
    endD = endD + ' ' + endT;

    this.perform.getPerformanceData(appName, startD, endD)
    .subscribe((response: any) => {
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);

      this.getAllperformancelist = response.serviceResponse;
      console.log('performance response:', response);
    
    
    }, (error: any) => {
      // Handle the error
    
      console.error('Login error:', error);
    });


  }

  getApplicationAlllist() {
    let user_Id = localStorage.getItem('user_id');
    this.dashboardService.getApplicationlist(user_Id)
      .subscribe((response: any) => {
        this.applicationList = response.serviceResponse;
        localStorage.setItem('appName', this.applicationList[0]);
        console.log("applicationList---", this.applicationList);
      }, (error: any) => {
        // Handle the error
        console.error('Login error:', error);
      });
  }

  exportTableToExcel(tableId: string): void {
    /* table id is passed over here */
    this.filename = this.appName+'.xlsx'
    // const targetTable = document.getElementById(tableId);
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(targetTable);

    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    // XLSX.writeFile(wb, this.filename);




    const table = document.getElementById(tableId);
    if (!table) {
      console.error(`Table with id ${tableId} not found`);
      return;
    }

    // Convert the table to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

   // Apply custom styles to the header row
   const range = XLSX.utils.decode_range(ws['!ref'] || ''); // Handle undefined
   for (let C = range.s.c; C <= range.e.c; ++C) {
     const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
     if (!ws[cellAddress]) continue;
     ws[cellAddress].s = {
       font: {
         bold: true,
         color: { rgb: "000000" } // Black color in hexadecimal
       },
       fill: {
         patternType: 'solid',
         fgColor: { rgb: "FFFF00" } // Yellow color in hexadecimal
       }
     };
   }

    // Create a new workbook and append the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save to file
    XLSX.writeFile(wb,  this.filename);
  }


}
