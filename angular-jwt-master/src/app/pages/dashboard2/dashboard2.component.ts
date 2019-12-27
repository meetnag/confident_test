import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { LocalDataSource } from 'ng2-smart-table';
import { OcModel } from '@app/shared/_models/oc-model';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@app/shared/_services';

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
  source: LocalDataSource = new LocalDataSource();
  currentUser$: Subscription;
  currentUser: any;
  settings = {
    actions: false,
    columns: {
      OCNumber: {
        title: 'OC Number',
        filter: false
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
      Status: {
        title: 'Status',
        filter: false,
        valuePrepareFunction: (value) => { return value.name }
      },
    },
    pager: {
      display: true,
      perPage: 25
    }
  };
  userRole: any;
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
      this.dateFormat = 'dd/MM/yyyy'
    }
    this.getOcList();
    this.getBranch();
  }
  public loadScript(url: string) {
    this.dateFormat = 'dd/MM/yyyy'
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
  getOcList() {
    let body;
    if (this.currentUser.userRole === 'Branch/Dealer') {
      body.branchId = this.currentUser.user.branchId;
    }
    this.dashboardService.getOcList(body).subscribe(data => {
      if (data.status === 'success') {
        this.ocList = data.data.ocList;
        this.source.load(this.ocList);
      }
    });
  }
  onBranchChange() {
    this.getOcList();
  }
}
