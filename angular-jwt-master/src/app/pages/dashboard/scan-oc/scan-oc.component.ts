import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '@app/shared/_services';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { OcModel, Customer } from '@app/shared/_models/oc-model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-scan',
  templateUrl: './scan-oc.component.html',
  styleUrls: ['./scan-oc.component.css'],
  providers: [DatePipe]
})
export class ScanOcComponent implements OnInit, OnDestroy {

  searchOcNo = '';
  currentUser$: Subscription;
  currentUser: any;
  ocObj = new OcModel();
  showTimeLine = false;
  id: any;
  customerName = '';
  location = '';
  product = '';
  qaTeamObj = {};
  salesTeamObj = {};
  branchTeamObj = {};
  customerObj = {};
  qrCodeString = '';
  constructor(private authenticationService: AuthenticationService, private dashboardService: DashboardService, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private toasterService: ToastrService
  ) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
      }
    })
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
  onSubmit() {
    if (this.searchOcNo != '') {
      this.getOcByNumber();
    } else {
      this.showTimeLine = false;
    }
  }
  onBack() {
    this.router.navigate(['/pages/oc-list']);
  }
  getOcByNumber() {
    let body = {};

    body = {
      OCNumber: this.searchOcNo,
      roleName: this.currentUser.userRole,
      qrCode: false
    };
    if (this.currentUser) {
      if (this.currentUser.userRole == 'Branch/Dealer') {
        body['branchId'] = this.currentUser.user.branchId;
      }
    }
    this.dashboardService.getOcByNumber(body).subscribe(data => {
      // console.log(data)

      if (data.status === 'success') {
        // console.log(data.data);
        if (data.data && data.data.ocList.length) {

          this.ocObj = new OcModel();
          // console.log(this.ocObj)
          this.ocObj.Customer = new Customer();
          this.qaTeamObj = {};
          this.salesTeamObj = {};
          this.branchTeamObj = {};
          this.customerObj = {};
          this.ocObj.SerialNumbers = [];
          this.ocObj.StatusLog = [];
          this.ocObj = data.data.ocList[0];

          var raw = new Date(this.ocObj.OCDate);

          this.ocObj.OCDate = this.datePipe.transform(raw, 'dd/MM/yyyy ');
          // console.log(this.ocObj)
          if (this.ocObj.Customer && this.ocObj.Customer.name != '') {
            this.customerName = this.ocObj.Customer.name;
          }
          if (this.ocObj.Customer && this.ocObj.Customer.city != '') {
            this.location = this.ocObj.Customer.city;
          }
          // if (this.ocObj.ProductID && this.ocObj.ProductID._id != '') {
          //   this.product = this.ocObj.ProductID.name;
          // }
          if (this.ocObj.StatusLog && this.ocObj.StatusLog.length) {
            this.ocObj.StatusLog.forEach(ele => {
              if (ele.PreviousStatus === 'New' && ele.ChangedStatus === 'New') {
                this.qaTeamObj = ele;
                raw = new Date(this.qaTeamObj['Date']);
                this.qaTeamObj['Date'] = this.datePipe.transform(raw, 'dd/MM/yyyy ');

              } else if (ele.PreviousStatus === 'New' && ele.ChangedStatus === 'In Progress - Sales') {
                this.salesTeamObj = ele;
                raw = new Date(this.salesTeamObj['Date']);

                this.salesTeamObj['Date'] = this.datePipe.transform(raw, 'dd/MM/yyyy ');
              } else if (ele.PreviousStatus === 'In Progress - Sales' && ele.ChangedStatus === 'In Progress - Branch/Dealer') {
                this.branchTeamObj = ele;
                raw = new Date(this.branchTeamObj['Date']);
                this.branchTeamObj['Date'] = this.datePipe.transform(raw, 'dd/MM/yyyy ');

              }
            });
            this.customerObj['installedBy'] = this.ocObj.Installation ? (this.ocObj.Installation.installationTechnician) : '';
            this.customerObj['installedDate'] = this.ocObj.Installation ? (this.ocObj.Installation.installationDate) : '';
            this.customerObj['installedDate'] = this.datePipe.transform(this.customerObj['installedDate'], 'dd/MM/yyyy ');

          }
          this.showTimeLine = true;
        } else {
          this.showTimeLine = false;
          this.toasterService.error("Invalid OC Number");
        }
      } else {
        this.toasterService.error(data.message);
      }
    });
  }
}
