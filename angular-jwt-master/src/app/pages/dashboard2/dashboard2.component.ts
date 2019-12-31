import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { LocalDataSource } from 'ng2-smart-table';
import { OcModel } from '@app/shared/_models/oc-model';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@app/shared/_services';
import { IMyDpOptions } from 'mydatepicker';

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
  totalDispatched = 80;
  installationCompleted = 20;
  installationPending = 33;
  backlogsOrder = 45;
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
      this.loadScript('../assets/jquery-swap.js');
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
    this.dashboardService.getDashboardOcList(body).subscribe(data => {
      if (data.status === 'success') {
        this.ocList = data.data.ocList;
        this.source.load(this.ocList);
      }
    });
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
}
