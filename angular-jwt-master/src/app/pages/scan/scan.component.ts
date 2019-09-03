import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '@app/shared/_services';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { OcModel, Customer } from '@app/shared/_models/oc-model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit, OnDestroy {

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
  qrCodeFlag = false;
  constructor(private authenticationService: AuthenticationService, private dashboardService: DashboardService,
    private route: ActivatedRoute, private router: Router, private toasterService: ToastrService
  ) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.qrCodeFlag = false;
        this.currentUser = data;
      }
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id)/

    if (this.id == 0) {
      this.searchOcNo = '';
    } else {
      if (this.currentUser) {
        this.qrCodeFlag = false;
      } else
        this.qrCodeFlag = true;

      this.searchOcNo = this.id;
      this.getOcByNumber();
    }
  }
  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
  onSubmit() {
    // this.qrCodeFlag = false;
    if (this.searchOcNo != '') {
      this.getOcByNumber();
    } else {
      this.showTimeLine = false;
    }
  }
  onBack() {
    this.router.navigate(['/pages/dashboard']);
  }
  getOcByNumber() {
    let body = {};
    if (this.qrCodeFlag) {
      body = {
        OCNumber: this.searchOcNo,
        roleName: "Admin"
      };
    } else {
      body = {
        OCNumber: this.searchOcNo,
        roleName: this.currentUser.userRole
      };
    }
    // console.log("calling",body)
    if (this.currentUser) {
      if (this.currentUser.userRole == 'Branch/Dealer') {
        body['branchId'] = this.currentUser.user.branchId;
      }
    }
    this.dashboardService.getOcByNumber(body).subscribe(data => {
      console.log(data)
      if (data.status === 'success') {
        // console.log(data.data);
        if (data.data && data.data.ocList.length) {
          this.ocObj = new OcModel();
          this.ocObj.Customer = new Customer();
          this.qaTeamObj = {};
          this.salesTeamObj = {};
          this.branchTeamObj = {};
          this.customerObj = {};
          this.ocObj.SerialNumbers = [];
          this.ocObj.StatusLog = [];
          this.ocObj = data.data.ocList[0];
          if (this.ocObj.Customer && this.ocObj.Customer.name != '') {
            this.customerName = this.ocObj.Customer.name;
          }
          if (this.ocObj.Customer && this.ocObj.Customer.city != '') {
            this.location = this.ocObj.Customer.city;
          }
          if (this.ocObj.ProductID && this.ocObj.ProductID._id != '') {
            this.product = this.ocObj.ProductID.name;
          }
          if (this.ocObj.StatusLog && this.ocObj.StatusLog.length) {
            this.ocObj.StatusLog.forEach(ele => {
              if (ele.ChangedStatus === 'In Progress - Sales') {
                this.qaTeamObj = ele;
              } else if (ele.ChangedStatus === 'In Progress - Branch/Dealer' || ele.ChangedStatus === 'Installation Complete') {
                this.salesTeamObj = ele;
              } else if (ele.ChangedStatus === 'Closed' || ele.ChangedStatus === 'Installation Scheduled') {
                this.branchTeamObj = ele;
              }
            });
            this.customerObj['installedBy'] = this.ocObj.Installation ? (this.ocObj.Installation.installationTechnician) : '';
            this.customerObj['installedDate'] = this.ocObj.Installation ? (this.ocObj.Installation.installationDate) : '';
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
