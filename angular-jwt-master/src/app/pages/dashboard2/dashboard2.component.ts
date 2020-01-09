import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { LocalDataSource } from 'ng2-smart-table';
import { OcModel } from '@app/shared/_models/oc-model';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@app/shared/_services';
import { IMyDpOptions } from 'mydatepicker';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css'],
  providers: [DatePipe]
})
export class Dashboard2Component implements OnInit {
  branchList: any = [];
  ocList: OcModel[] = [];
  dateFormat = 'yyyy-MM-dd';
  dateFormatP = "yyyy-mm-dd";
  selectedBranch = '';
  color = 'primary';
  mode = 'determinate';
  totalDispatched = 0;
  installationCompleted = 0;
  installationPending = 0;
  source: LocalDataSource = new LocalDataSource();
  currentUser$: Subscription;
  currentUser: any;
  settings = {
    actions: false,
    columns: {
      OCNumber: {
        title: 'Order No.',
        filter: false
      },
      typeOfSale: {
        title: 'Sale',
        filter: false
      },
      BranchID: {
        title: 'Branch',
        filter: false,
        valuePrepareFunction: (value) => { return value.name }
      },
      Status: {
        title: 'Status',
        filter: false,
        valuePrepareFunction: (value) => { return value.name }
      },
      OCDate: {
        title: 'OC Date',
        filter: false,
        valuePrepareFunction: (OCDate) => {
          if (OCDate) {
            var raw = new Date(OCDate);
            if (raw) {
              return this.datePipe.transform(raw, this.dateFormat);
            }
          }
        }
      },
      _id: {
        title: 'Month',
        filter: false,
        valuePrepareFunction: (_id, row) => {
          if (row.OCDate) {
            var raw = new Date(row.OCDate);
            if (raw) {
              return this.datePipe.transform(raw, 'MMM');
            }
          }
        }
      },
      Priority: {
        title: 'Year',
        filter: false,
        valuePrepareFunction: (_id, row) => {
          if (row.OCDate) {
            var raw = new Date(row.OCDate);
            if (raw) {
              return this.datePipe.transform(raw, 'yyyy');
            }
          }
        }
      },
    },
    pager: {
      display: true,
      perPage: 25
    }
  };
  userRole: any;
  fromDate;
  toDate;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: this.dateFormatP,
  };
  chartOption: any = {}
  seriesLabel = {
    normal: {
      show: true,
      textBorderColor: '#333',
      textBorderWidth: 2
    }
  }
  multibarchartOption: any = {};
  piechartOption: any = {};
  branchArray: any[] = [];
  totalCount: any[] = [];
  pendingCount: any[] = [];
  closedCount: any[] = [];
  constructor(private dashboardService: DashboardService, private datePipe: DatePipe, private authenticationService: AuthenticationService) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
        this.userRole = this.currentUser.userRole;
      }
    })
  }

  ngOnInit() {
    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
    if (isIEOrEdge) {
      this.loadScript('../../../assets/jquery-swap.js');
      this.dateFormat = 'dd/MM/yyyy';
      this.dateFormatP = 'dd/mm/yyyy';
    }
    var d = new Date();
    this.fromDate = this.getFormattedDate(d.setDate(d.getDate() - 30));
    this.toDate = this.getFormattedDate(new Date());
    this.getOcList();
    this.getBranch();
  }
  public loadScript(url: string) {
    this.dateFormat = 'dd/MM/yyyy';
    this.dateFormatP = 'dd/mm/yyyy';
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  getBranch() {
    this.dashboardService.getBranchList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.branchList = res.data["branchList"];
      }
    });
  }
  getFormattedDate(dateToFormat) {
    let date = new Date(dateToFormat);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return {
      date: {
        year: year,
        month: month,
        day: day
      },
      formatted: year + '-' + month + '-' + day
    }
  }
  getOcList() {
    let body = {};
    if (this.selectedBranch != '') {
      body['branchId'] = this.selectedBranch;
    }
    if (this.fromDate) {
      body['fromDate'] = this.fromDate.formatted;
    }
    if (this.toDate) {
      body['toDate'] = this.toDate.formatted;
    }
    console.log('fromdate', this.fromDate);
    console.log('todate', this.toDate);
    if (this.currentUser.userRole === 'Branch/Dealer') {
      body['branchId'] = this.currentUser.user.branchId;
    }
    console.log('body', body);
    body['roleName'] = this.userRole;
    this.dashboardService.getDashboardOcList(body).subscribe(data => {
      if (data.status === 'success') {
        this.ocList = data.data.ocList;
        this.totalDispatched = data.data.totalCount ? data.data.totalCount : 0;
        this.installationCompleted = data.data.compeletedAndClosedCount ? data.data.compeletedAndClosedCount : 0;
        this.installationPending = data.data.pendingCount ? data.data.pendingCount : 0;
        this.source.load(this.ocList);
        if (data.data.barChart) {
          this.chartOption = this.setBarOptions(data.data.barChart);
        }
        if (data.data.priortyArray) {
          this.piechartOption = this.setPieOptions(data.data.priortyArray);
        }
        if (data.data.multipleCharts) {
          this.getMultichartData(data.data.multipleCharts);

          this.multibarchartOption = this.setMultiBarChartOptions(data.data.multipleCharts);
        }
      }
    });
  }
  getMultichartData(data) {
    console.log('data', data)
    this.branchArray = [];
    this.totalCount = [];
    this.pendingCount = [];
    this.closedCount = [];
    if (data) {
      if (data.Total && data.Total.branchName && data.Total.branchName.length) {
        this.branchArray = data.Total.branchName;
      }
      if (data.pending && data.pending.branchName && data.pending.branchName.length) {
        if (this.branchArray.length) {
          data.pending.branchName.forEach(ele => {
            let i = this.branchArray.findIndex(i => i == ele);
            if (i == -1) {
              this.branchArray.push(ele);
            }
          })
        }
      }
      if (data.Closed && data.Closed.branchName && data.Closed.branchName.length) {
        if (this.branchArray.length) {
          data.Closed.branchName.forEach(ele => {
            let i = this.branchArray.findIndex(i => i == ele);
            if (i == -1) {
              this.branchArray.push(ele);
            }
          })
        }
      }
      if (this.branchArray) {
        if (data.Total && data.Total.branchName && data.Total.branchName.length) {
          this.branchArray.forEach(ele => {
            let i = data.Total.branchName.findIndex(i => i == ele);
            if (i > -1) {
              this.totalCount.push(data.Total.TotalOcCountArray[i])
            } else {
              this.totalCount.push(0);
            }
          })
        } else {
          this.branchArray.forEach(ele => {
            this.totalCount.push(0);
          })
        }
        if (data.pending && data.pending.branchName && data.pending.branchName.length) {
          this.branchArray.forEach(ele => {
            let i = data.pending.branchName.findIndex(i => i == ele);
            if (i > -1) {
              this.pendingCount.push(data.pending.PendingOcCountArray[i])
            } else {
              this.pendingCount.push(0);
            }
          })
        } else {
          this.branchArray.forEach(ele => {
            this.pendingCount.push(0);
          })
        }
        if (data.Closed && data.Closed.branchName && data.Closed.branchName.length) {
          this.branchArray.forEach(ele => {
            let i = data.Closed.branchName.findIndex(i => i == ele);
            if (i > -1) {
              this.closedCount.push(data.Closed.ClosedOcCountArray[i])
            } else {
              this.closedCount.push(0);
            }
          })
        } else {
          this.branchArray.forEach(ele => {
            this.closedCount.push(0);
          })
        }
      }
      console.log('branch', this.branchArray)
    }
  }

  onBranchChange() {
    this.getOcList();
  }
  onToDateChanged(event) {
    console.log('toDate', event)
    this.toDate.date = event.date;
    this.toDate.formatted = event.formatted;
    this.getOcList();
  }
  onFromDateChanged(event) {
    console.log('fromDate', event)
    this.fromDate.date = event.date;
    this.fromDate.formatted = event.formatted;
    this.getOcList();
  }
  onExport() {

  }
  setBarOptions(data) {
    return {
      title: {
        text: 'Orders In Progress',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: data.branchArray
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: data.OcListCountArray,
        type: 'bar'
      }]
    }
  }
  setPieOptions(data) {
    return {
      title: {
        text: 'Priority OCs',
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['HIGH', 'MEDIUM', 'LOW'],
      },
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
  setMultiBarChartOptions(data) {
    return {
      title: {
        text: 'Installation Schedule & Complete at Branch',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        top: 20,
        bottom: 20,
        data: ['Total Order', 'Installation Complete', 'Installation Scheduled']
      },
      xAxis: {
        type: 'value',
        name: 'OCs',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'category',
        inverse: true,
        // data: data.multipleBranchArray,
        data: this.branchArray
      },
      series: [
        {
          name: 'Total Order',
          type: 'bar',
          data: this.totalCount,
          // data: data.multipleTotalOcCountArray,
          label: this.seriesLabel,
        },
        {
          name: 'Installation Complete',
          type: 'bar',
          label: this.seriesLabel,
          data: this.closedCount,
          // data: data.multipleClosedOcCountArray
        },
        {
          name: 'Installation Scheduled',
          type: 'bar',
          label: this.seriesLabel,
          data: this.pendingCount,
          // data: data.multiplePendingOcCountArray
        }
      ]

    }
  }
}
