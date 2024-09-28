import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { DashbordService } from 'src/app/services/dashbord.service';

@Component({
  selector: 'app-waterfall',
  templateUrl: './waterfall.component.html',
  styleUrls: ['./waterfall.component.css']
})
export class WaterfallComponent implements OnInit {

  isNodataTable: boolean = false;
  isHide: boolean = false;
  executionId: string | null = null;
  pageDataList: any;
  loadTimeSpan: any;
  pageDataAppName: any;
  pageDataAppNameWithoutArrow: any;
  pageDataPageName: any;
  pageDataTimeStamp: any;

  constructor(private route: ActivatedRoute, private dashbordservice: DashbordService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.executionId = params.get('executionId');
      if (this.executionId) {
        console.log(`Execution ID: ${this.executionId}`);
        this.gethardetails();
      }
    });
  }

  gethardetails() {
    this.dashbordservice.getWaterfalldetailsbyid(this.executionId)
      .subscribe(
        (response: any) => {
          this.pageDataList = response.serviceResponse;
          console.log("HAR Details list:", this.pageDataList);
          if (this.pageDataList && this.pageDataList.length > 0) {
            this.loadTimeSpan = this.pageDataList[0].loadTimeSpan;
            this.pageDataAppName = this.pageDataList[0].application_name + '>>';
            this.pageDataAppNameWithoutArrow = this.pageDataList[0].application_name;
            this.pageDataPageName = this.pageDataList[0].page_name;
            this.pageDataTimeStamp = '_[' + this.pageDataList[0].pageAnalysisTime + ']';
            this.renderCharts();
            this.isNodataTable = false;
          } else {
            this.isNodataTable = true;
          }
        },
        (error: any) => {
          console.error('Error fetching HAR details:', error);
        }
      );
  }

  renderCharts(): void {
    
    if (!this.pageDataList || this.pageDataList.length === 0) {
      return; // No data to render
    }

    this.renderPieChart('pieChart1', [
      `Blocked (${this.pageDataList[0].request_summaries[0]})`,
      `DNS (${this.pageDataList[0].request_summaries[1]})`,
      `SSL/TLS (${this.pageDataList[0].request_summaries[2]})`,
      `Connect (${this.pageDataList[0].request_summaries[3]})`,
      `Send (${this.pageDataList[0].request_summaries[4]})`,
      `Wait (${this.pageDataList[0].request_summaries[5]})`,
      `Receive (${this.pageDataList[0].request_summaries[6]})`
    ], [
      this.pageDataList[0].request_summaries[0],
      this.pageDataList[0].request_summaries[1],
      this.pageDataList[0].request_summaries[2],
      this.pageDataList[0].request_summaries[3],
      this.pageDataList[0].request_summaries[4],
      this.pageDataList[0].request_summaries[5],
      this.pageDataList[0].request_summaries[6]
    ], [
      '#e4d6c1', '#77c0cb', '#a8c4ad', '#b3de5d', '#e0ab9d', '#a396be', '#c2c2c2'
    ]);

    this.renderPieChart('pieChart2', [
      `HTML/Text (${this.pageDataList[0].mime_types[0]})`,
      `JavaScript (${this.pageDataList[0].mime_types[1]})`,
      `CSS (${this.pageDataList[0].mime_types[2]})`,
      `Image (${this.pageDataList[0].mime_types[3]})`,
      `Flash (${this.pageDataList[0].mime_types[4]})`,
      `Other (${this.pageDataList[0].mime_types[5]})`
    ], [
      this.pageDataList[0].mime_types[0],
      this.pageDataList[0].mime_types[1],
      this.pageDataList[0].mime_types[2],
      this.pageDataList[0].mime_types[3],
      this.pageDataList[0].mime_types[4],
      this.pageDataList[0].mime_types[5]
    ], [
      '#aeeada', '#f5e6ba', '#d4ccdb', '#dcabb5', '#a69cde', '#e5abff'
    ]);

    this.renderPieChart('pieChart3', [
      `Headers Sent (${this.pageDataList[0].header_body_summaries[0]})`,
      `Bodies Sent (${this.pageDataList[0].header_body_summaries[1]})`,
      `Headers Received (${this.pageDataList[0].header_body_summaries[2]})`,
      `Bodies Received (${this.pageDataList[0].header_body_summaries[3]})`
    ], [
      this.pageDataList[0].header_body_summaries[0],
      this.pageDataList[0].header_body_summaries[1],
      this.pageDataList[0].header_body_summaries[2],
      this.pageDataList[0].header_body_summaries[3]
    ], [
      '#f7b3e3', '#e2a0f1', '#a6e8a6', '#a8c4ad'
    ]);
  }

  renderPieChart(chartId: string, labels: string[], data: number[], backgroundColor: string[]): void {
    const pieCanvas = document.getElementById(chartId) as HTMLCanvasElement;
    if (!pieCanvas) {
      console.error(`Element with id ${chartId} not found.`);
      return;
    }
    new Chart(pieCanvas, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                family: 'Lato',
                size: 10
              },
              color: 'black'
            }
          }
        }
      }
    });
  }

  hideGraphs() {
    const element = document.getElementById("graphs");
    const tableScroller = document.getElementById("tableScroller");

    if (element && tableScroller) {
      if (this.isHide) {
        element.style.display = "none";
        this.isHide = false;
        tableScroller.style.height = "auto";
      } else {
        element.style.display = "block";
        this.isHide = true;
        tableScroller.style.height = "";
      }
    } else {
      console.error("Element not found.");
    }
  }
}
