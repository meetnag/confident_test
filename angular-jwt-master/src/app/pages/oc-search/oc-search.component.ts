import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '@app/shared/_services';
import { OcModel } from '@app/shared/_models/oc-model';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-oc-search',
  templateUrl: './oc-search.component.html',
  styleUrls: ['./oc-search.component.css'],
  providers: [DatePipe]
})
export class OcSearchComponent implements OnInit, OnDestroy {
  currentUser$: Subscription;
  currentUser: any;
  userRole = '';
  ocList: OcModel[] = [];
  dateFormat = 'yyyy-MM-dd';
  source: LocalDataSource = new LocalDataSource();
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
      typeOfSale: {
        title: 'Sale',
        filter: false
      },
      _id: {
        title: 'Inovice Date',
        filter: false,
        valuePrepareFunction: (ele, row) => {
          if (row.Installation && row.Installation.invoiceDate) {
            var raw = new Date(row.Installation.invoiceDate);
            if (raw) {
              return this.datePipe.transform(raw, this.dateFormat);
            }
          }
        }
      },
      Installation: {
        title: 'Installation Date',
        filter: false,
        valuePrepareFunction: (ele, row) => {
          if (row.Installation && row.Installation.installationDate) {
            var raw = new Date(row.Installation.installationDate);
            if (raw) {
              return this.datePipe.transform(raw, this.dateFormat);
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
  OCNumber = '';
  invoiceNumber = '';
  docName = '';
  customerLandLineNumber = '';
  customerMobileNumber = '';
  constructor(private router: Router, private dashboardService: DashboardService, private datePipe: DatePipe,
    private authenticationService: AuthenticationService) {
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
      this.dateFormat = 'dd/MM/yyyy'
    }
    this.getOcList();
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
  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
  getOcList() {
    let body = {
      'OCNumber': this.OCNumber,
      'invoiceNumber': this.invoiceNumber,
      'docName': this.docName,
      'customerMobileNumber': this.customerMobileNumber,
      'customerLandLineNumber': this.customerLandLineNumber
    };
    body['roleName'] = this.userRole;
    if (this.currentUser.userRole === 'Branch/Dealer') {
      body['branchId'] = this.currentUser.user.branchId;
    }
    this.dashboardService.getOcSearchList(body).subscribe(data => {
      if (data.status === 'success') {
        this.ocList = data.data.ocList;
        this.source.load(this.ocList);
      }
    });
  }
  onResetFilter() {
    this.OCNumber = '';
    this.invoiceNumber = '';
    this.docName = '';
    this.customerMobileNumber = '';
    this.customerLandLineNumber = '';
    this.getOcList();
  }
  onSearch() {
    this.getOcList();
  }
  onInvNumberChange() {

  }
  onOcNumberChange() {

  }
  onNameChange() {

  }
  onLandlineChange() {

  }
  onMobileChange() {

  }
}
