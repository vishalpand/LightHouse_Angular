import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashbordService } from '../services/dashbord.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  @ViewChild('errorModal') errorModal: any;
  public baseUrl = environment.baseUrl;

  @ViewChild('sl') splineChartContainer: any;


  isHovered: boolean = false;
  showGraphData: boolean = false;

  isUserLogged: any = localStorage.getItem('is_active');
  appName: any = localStorage.getItem('appName');
  startDate: any = moment().format("YYYY-MM-DD"); sl: any;

  startTime: any = '00:00:00';
  endDate: any = moment().format("YYYY-MM-DD");;
  endTime: any = '23:59:59';

  getDashbordlistData: any
  graphData: any

  graphData1: any = [];

  availability: any = 0;
  transaction_monitored: any = 0;
  error_Count: any = 0;
  t90_percentile: any = 0;
  average_loatTime: any = 0;


  applicationList = [];

  Dataforchart: any
  errorlist: any


  Highcharts: typeof Highcharts = Highcharts;





  maxTodayDate: any


  constructor(private dashboardService: DashbordService, private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService) {
    this.maxTodayDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.getApplicationAlllist();
    let applicatiname = localStorage.getItem('appName');
    let startD = moment().format("YYYY-MM-DD");
    let endD = moment().format("YYYY-MM-DD");
    let starT = '00:00:00';
    let endT = '23:59:59';

    this.getAllDashboardData(applicatiname, startD, endD, starT, endT);

  }


  openErrormodal() {
    if (this.errorModal) {
      this.errorModal.nativeElement.classList.add('show');
      this.errorModal.nativeElement.style.display = 'block';
    }

    const s = `${this.startDate} ${this.startTime}`;
    const e = `${this.endDate} ${this.endTime}`;
    this.dashboardService.getErrorList(this.appName, s, e).subscribe((response: any) => {
      this.errorlist = response.serviceResponse;
      console.log(this.errorlist);
    }, (error: any) => {
      console.log(error);
    }


    )
  }

  closeErrormodal() {
    if (this.errorModal) {
      this.errorModal.nativeElement.classList.remove('show');
      this.errorModal.nativeElement.style.display = 'none';
    }
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

  getAllDashboardData(appName: any, startD: any, endD: any, starT: any, endT: any) {
    this.spinner.show();
    console.log("***", this.startDate);
    console.log("***", this.startTime);
    console.log("***", this.endDate);
    console.log("***", this.endTime);
    console.log("***", this.appName);

    startD = startD + ' ' + starT;
    endD = endD + ' ' + endT;

    this.dashboardService.getAllDashboardData(appName, startD, endD)
      .subscribe((response: any) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        console.log('Login response:', response);
        this.getDashbordlistData = response.serviceResponse;
        const calc = this.getDashbordlistData.CalcData;
        this.availability = calc[0];
        this.transaction_monitored = calc[1];
        this.error_Count = calc[2];
        this.t90_percentile = calc[3];
        this.average_loatTime = calc[4];
        this.Dataforchart = this.getDashbordlistData.GraphData;
        if (this.Dataforchart == null) {
          let grapnull: any = []
          this.getsplineChartData(grapnull);
        } else {
          this.getsplineChartData(this.Dataforchart);
        }
        let linechartsData = this.getDashbordlistData.LineGraph;
        if (linechartsData == null) {
          this.lineGraph([]);
        } else {
          this.lineGraph(linechartsData);
        }
        let getAvg = this.getDashbordlistData.SlowPages;
        if (getAvg == null) {
          this.getAvgResponse([]);
        } else {
          this.getAvgResponse(getAvg);
        }

        console.log("calcedata", calc);
      }, (error: any) => {
        // Handle the error
        this.refreshCharts();
        console.error('Login error:', error);
      });

  }


  refreshCharts() {
    // Call the functions responsible for updating the charts
    let Dataforchart: any = []; // Provide empty data or null if required
    this.getsplineChartData(Dataforchart);
    this.lineGraph([]);
    this.getAvgResponse([]);
    // You may add more chart refreshing functions here if needed
  }


  clearDashboardData() {
    this.appName = localStorage.getItem('appName');
    this.startDate = moment().format("YYYY-MM-DD");;
    this.startTime = '00:00:00';
    this.endDate = moment().format("YYYY-MM-DD");;
    this.endTime = '23:59:59';
  }


  getErrordetails() {

    // this.startDate = this.startDate + " " + this.startTime;
    // this.endDate = this.endDate + " " + this.endTime;





  }



  getsplineChartData(splineCharts: any): void {
    let graphData = this.processGraphData(splineCharts);



    Highcharts.chart('splineChartContainer', {
      time: {
        timezoneOffset: new Date().getTimezoneOffset()
      },
      lang: { noData: 'No Data Available' }
    });




    let chartInstance: Highcharts.Options = {
      chart: {
        type: 'spline',
        height: 300,
        zoomType: 'x' as any,
        resetZoomButton: {
          position: { x: 0, y: -30 }
        },
        events: { load: () => { /* Custom load event function */ } }
      } as any,
      credits: { enabled: false },
      title: { text: '' },
      subtitle: { text: '<div style="font-weight: 600;font-size: 12px;fill:black; margin-left: 10px;">Transaction Response Time Graph</div>' },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        x: 0,
        y: 20,
        itemStyle: { fontSize: '10px', fontWeight: 'bold' }

      },

      tooltip: {
        style: { pointerEvents: 'auto' },
        shared: true,
        useHTML: true,
        headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
        valueDecimals: 2
      },


      yAxis: {
        title:
        {
          text: '<div style="font-weight: bolder;font-size: 12px;fill:black;">Time Response (sec)</div>'
        },
        tickPositions: [0, 25, 50, 75, 100],
        max: 10

      },
      xAxis: { type: 'datetime' },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {

              click: (event: any) => this.onClick(event),
              mouseOver: (event: any) => this.onMouseOver(event),


            }
          }
        },
        line: { marker: { enabled: false } }
      },
      series: graphData as any
    };

    Highcharts.chart('splineChartContainer', chartInstance);


  }





  onClick(event: any) {
    let cloneToolTip = null;
    const series = event.point.series;
    const index = event.point.index;

    if (cloneToolTip) {
      event.point.series.chart.container.firstChild.removeChild(cloneToolTip);
    }

    // cloneToolTip=event.point.series.chart.tooltip.label.element.cloneNode(true);
    // event.point.series.chart.container.firstChild.appendChild(cloneToolTip);

    console.log(event.point);
    console.log(series);
    console.log(series.options);
    console.log(series.options.data[index][2]);
  }

  onMouseOver(event: any) {
    const series = event.target.series;
    const index = event.target.index;
    const requestId = series.options.data[index][2];
    const dataIsPresentOrNot = series.options.data[index][3];
    const isFailedAtElastic = series.options.data[index][4];

    if (dataIsPresentOrNot == "Y" && isFailedAtElastic == "Y") {
      series.update({
        tooltip: {
          pointFormat: '<span style="color:{point.color}"></span>' + series.name + ': <b>' + event.target.y + '</b><br/>' + '<button id="contentAnalysisBtn" style="background: #e04243;color:white;width: 100%;margin-top: 5px;">Content Analysis</button><br/>' + '<span style="color:red;font-weight: bold;">' + "" + '</span> <br/>'
        }
      });
      document.getElementById('contentAnalysisBtn')?.addEventListener('click', () => {
        this.tooltipdata(event);
      });
    } else {
      series.update({
        tooltip: {
          pointFormat: '<span style="color:{point.color}"></span>' + series.name + ': <b>' + event.target.y + '</b><br/>'
        }
      });
    }

    sessionStorage.setItem("requestId", requestId);
    sessionStorage.setItem("dataIsPresentOrNot", dataIsPresentOrNot);
  }



  tooltipdata(event: any) {
    let requestId = sessionStorage.getItem('requestId');
    let dataIsPresent = sessionStorage.getItem('dataIsPresentOrNot');

    this.dashboardService.isharExist(requestId).subscribe((response: any) => {
      if (response.serviceResponse == 'Har Id Exists!') {
        if (requestId) {
          const url = `http://localhost:4200/#/ApmosysAngularMonitoringPortal/Dashboard/waterfall?executionId=${requestId}`;
          const newWindow = window.open(url, '_blank');
          if (!newWindow) {
            console.error('Failed to open new window');
          }
        } else {
          console.error('Request ID is not available in session storage');
        }

      }

      if (response.serviceResponse == 'Har Id does not Exists!') {
         alert("Har Data not abvailble !!!!");
      }
    }, (error: any) => {
      alert(error.serviceResponse);
    }

    )



  }




  processGraphData(graphObject: any) {

    let data1 = [];
    let c = [];
    let i = 0;

    let arr = [];

    let array = [];
    arr = Object.keys(graphObject);
    for (let i = 0; i < arr.length; i++) {
      let obj: any = {
        name: null,
        data: null,
        lineWidth: null
      };

      obj.name = arr[i];
      obj.data = graphObject[arr[i]];
      obj.lineWidth = 0.5;
      array.push(obj);
    }
    this.graphData1 = array;
    Object.keys(this.graphData1).map((key: any, _index: any) => {
      this.graphData1[key].data.map((value: any, keys: any, _index: any) => {
        this.graphData1[key].data[keys][0] = new Date(value[0]).getTime();
      });
    });

    return this.graphData1;

  }





  // toggleChartPages(event:any) {

  //   this.showGraphData = event.target.checked;
  //   const chartsspline = Highcharts.charts[Highcharts.charts.length - 3];
  //   if (chartsspline) {

  //     if (this.showGraphData) {
  //         chartsspline.series.forEach((series: any) => {
  //             series.hide();
  //         });
  //     } else {

  //         chartsspline.series.forEach((series: any) => {

  //             series.show();
  //         });

  //     }

  // }


  // }

  toggleChartPages = (event: any) => {
    this.showGraphData = event.target.checked;
    const chartsspline = Highcharts.charts[Highcharts.charts.length - 3];

    if (chartsspline) {
      // Disable animation for better performance
      Highcharts.each(chartsspline.series, (series: any) => {
        series.setVisible(!this.showGraphData, false);
      });

      // Redraw the chart once after all series have been shown/hidden
      chartsspline.redraw();
    }
  }







  getAvgResponse(responseData: any): void {

    const categories: string[] = [];
    const seriesData: any[] = [];

    responseData.forEach((data: any) => {
      const pageName = data[0];
      const avgResponse = data[1];
      seriesData.push({
        name: pageName,
        data: [{ name: pageName, y: avgResponse }]
      });
      categories.push(pageName);
    });

    const fixedBarWidth = 35;
    // const dynamicBarWidth = Math.max(fixedBarWidth, fixedBarWidth - (categories.length - 5) * 3);

    Highcharts.chart('container2', {
      chart: {
        type: 'column'
      },
      title: {
        text: '<div style="font-weight: bolder;font-size: 16px;fill:black;font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;">Top 5 Slow Pages</div>'
      },
      xAxis: {

        type: 'category',
        categories: categories,
        labels: {
          style: {
            fontSize: '9px',
            fontFamily: 'Verdana, sans-serif',
            color: "black",
            fontWeight: "bolder"
          }
        }

      },
      yAxis: {
        min: 0,
        title: {
          text: '<div style="font-weight: bolder;font-size: 12px;fill:black;">Avg Response (sec)</div>'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        valueDecimals: 2,
        pointFormat: 'Avg Response time is <b>{point.y:.1f} sec</b>'
      },
      credits: { enabled: false },
      plotOptions: {
        column: {
          pointWidth: 30, // Set the desired width for columns

        },
        series: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              if (this.point && this.point.y !== undefined) {
                return this.point.y.toFixed(1);
              }
              return '';
            }
          }
        }
      },
      series: seriesData
    });
  }




  lineGraph(lineGraph: any) {
    // Extracting apdex_score values and timestamps from responseData
    const dataPoints = lineGraph.map(function (item: any) {
      return {
        x: new Date(item[3]).getTime(), // Use timestamp as x-value
        y: parseFloat(item[2]) // Use apdex_score as y-value
      };
    });

    const options: Highcharts.Options = {
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Time'
        }
      },
      yAxis: {
        title: {
          text: 'Value'
        }
      },
      title: {
        text: 'ApdexScore vs Time'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'line',
        name: 'Apdex Score',
        data: dataPoints
      }]
    };

    Highcharts.chart('container12', options);

  }




}
