import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OcModel, Priority, CustomerType, Branch } from '@app/shared/_models/oc-model';
import { Subscription } from 'rxjs';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/shared/_services';
import { DatePipe } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-add-edit-oc-labels',
  templateUrl: './add-edit-oc-labels.component.html',
  styleUrls: ['./add-edit-oc-labels.component.css'],
  providers: [DatePipe]
})
export class AddEditOcLabelsComponent implements OnInit, OnDestroy {
  header = 'Generate Labels';
  public myAngularxQrCode: string = null;
  productList = [];
  priorityList: Priority[] = [];
  customerTypeList: CustomerType[] = [];
  branchList: Branch[] = [];
  ocObj = new OcModel();
  ocObj$: Subscription;
  scanList = [];
  currentUser$: Subscription;
  currentUser: any;

  constructor(private router: Router, private route: ActivatedRoute, private dashboardService: DashboardService,
    private toasterService: ToastrService, private authenticationService: AuthenticationService,
    private datePipe: DatePipe) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
      }
    })
    this.ocObj$ = this.dashboardService.currentOcObj.subscribe(data => {
      if (data) {
        this.ocObj = new OcModel();
        this.ocObj.SerialNumbers = [];
        this.ocObj = data;
        this.ocObj.OCDate = this.datePipe.transform(this.ocObj.OCDate, 'yyyy-MM-dd');
        if (this.ocObj.SerialNumbers.length) {
          this.scanList = [];
          this.ocObj.SerialNumbers.forEach(ele => {
            // let obj = { 'name': ele.name, 'code': this.ocObj.OCNumber + ele.srno + ele.ID };
            let obj = { 'name': ele.name, 'code': environment.domainUrl + 'scan/' + this.ocObj.OCNumber }
            this.scanList.push(obj);
          })
        }
        console.log('this.scanList', this.scanList)
      }
    })
  }

  ngOnInit() {
    this.getPriority();
    this.getCustomerType();
    this.getProduct();
    this.getBranch();
    this.myAngularxQrCode = 'Your QR code data string';
  }
  ngOnDestroy() {
    this.ocObj$.unsubscribe();
    this.currentUser$.unsubscribe();
  }

  onCancel() {
    localStorage.removeItem('ocObj');
    this.router.navigate(['/pages/dashboard']);
  }
  onPrint() {
    console.log('this.ocObj._id', this.ocObj)
    this.ocObj.userName = this.currentUser.user.name;
    this.ocObj.roleName = this.currentUser.userRole;
    delete this.ocObj.StatusLog;
    if (this.ocObj._id == undefined) {
      this.ocObj.CreatedDate = new Date();
      this.ocObj.Createdby = this.currentUser.user.name;
      this.dashboardService.addOc(this.ocObj).subscribe(res => {
        if (res.status === 'success') {
          this.toasterService.success(res.message);
          this.router.navigate(['/pages/dashboard']);
        } else {
          this.toasterService.error(res.message);
          this.router.navigate(['/pages/dashboard']);
        }
      }, err => {
        this.toasterService.error('Server Error');
      })
    } else {
      this.ocObj.UpdatedDate = new Date();
      this.ocObj.Updatedby = this.currentUser.user.name;
      this.dashboardService.updateOc(this.ocObj).subscribe(res => {
        if (res.status === 'success') {
          this.toasterService.success(res.message);
          this.router.navigate(['/pages/dashboard']);
        } else {
          this.toasterService.error(res.message);
          this.router.navigate(['/pages/dashboard']);
        }
      }, err => {
        this.toasterService.error('Server Error');
      })
    }

  }

  getProduct() {
    this.dashboardService.getProductList().subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.productList = res.data['productList'];
      } else {
        this.toasterService.error(res.message);
      }
    })
  }
  getBranch() {
    this.dashboardService.getBranchList().subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.branchList = res.data['branchList'];
      } else {
        this.toasterService.error(res.message);
      }
    })
  }
  getPriority() {
    this.dashboardService.getPriorityList().subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.priorityList = res.data['priorityList']
      } else {
        this.toasterService.error(res.message);
      }
    })
  }
  getCustomerType() {
    this.dashboardService.getCustomerTypeList().subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.customerTypeList = res.data['customerTypeList']
      } else {
        this.toasterService.error(res.message);
      }
    })
  }
  onPriorityChange() {
    if (this.priorityList.length) {
      let i = this.priorityList.findIndex(v => v._id == this.ocObj.Priority._id);
      if (i > -1) {
        this.ocObj.Priority = this.priorityList[i];
      }
    }
  }
  onProductChange() {
    if (this.productList.length) {
      let i = this.productList.findIndex(v => v._id == this.ocObj.ProductID._id);
      if (i > -1) {
        this.ocObj.ProductID = this.productList[i];
      }
    }
  }

  onCustomerTypeChange() {
    if (this.customerTypeList.length) {
      let i = this.customerTypeList.findIndex(v => v._id == this.ocObj.CustomerType._id);
      if (i > -1) {
        this.ocObj.CustomerType = this.customerTypeList[i];
      }
    }
  }
  onBranchChange() {
    if (this.branchList.length) {
      let i = this.branchList.findIndex(v => v._id == this.ocObj.BranchID._id);
      if (i > -1) {
        this.ocObj.BranchID = this.branchList[i];
      }
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && ((charCode < 46 || charCode > 57) || charCode == 47)) {
      return false;
    }
    return true;
  }
}
