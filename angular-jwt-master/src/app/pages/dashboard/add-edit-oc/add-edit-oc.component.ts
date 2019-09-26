import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { OcModel, Priority, SubAssembly, Spare, Product, CustomerType, Branch, Customer, Installation, SerialNumber } from '@app/shared/_models/oc-model';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@app/shared/_services/authentication.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-oc',
  templateUrl: './add-edit-oc.component.html',
  styleUrls: ['./add-edit-oc.component.css'],
  providers: [DatePipe]
})
export class AddEditOcComponent implements OnInit, OnDestroy {
  header = 'Add New OC';
  id: any;
  subAssemblyList: SubAssembly[] = [];
  productList = [];
  priorityList: Priority[] = [];
  customerTypeList: CustomerType[] = [];
  spareList: Spare[] = [];
  branchList: Branch[] = [];
  ocObj = new OcModel();
  ocObj$: Subscription;
  selectedSpare = [];
  selectedSubAssembly = [];
  currentUser$: Subscription;
  currentUser: any;
  installationObj = new Installation();
  isUpdate = true;
  dateFormat = 'yyyy-MM-dd';
  statuses = ['Direct Sale', 'Branch Sale'];
  stateList = [];
  countryList = [];
  constructor(private router: Router, private route: ActivatedRoute, private dashboardService: DashboardService,
    private toasterService: ToastrService, private authenticationService: AuthenticationService,
    private datePipe: DatePipe) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
        if (this.currentUser.userRole === 'Admin' || this.currentUser.userRole === 'QA Team') {
          this.isUpdate = false;
        }
      }
    })
    this.ocObj$ = this.dashboardService.currentOcObj.subscribe(data => {
      if (data) {
        this.ocObj = data;
      }
    })
  }

  ngOnInit() {
    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
    if (isIEOrEdge) {
      this.loadScript('../assets/jquery-swap.js');
      this.dateFormat = 'dd/MM/yyyy'
    }
    this.getPriority();
    this.getCustomerType();
    this.getSubAssembly();
    this.getProduct();
    this.getSpare();
    this.getBranch();
    this.getStateList();
    this.getCountry();
    this.ocObj = new OcModel();
    this.ocObj.Priority = new Priority();
    this.ocObj.SubAssemblyIDs = [];
    this.ocObj.SpareIDs = [];
    this.ocObj.ProductID = new Product();
    this.ocObj.CustomerType = new CustomerType();
    this.ocObj.BranchID = new Branch();
    this.ocObj.Customer = new Customer();
    this.ocObj.Installation = new Installation();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.header = 'Edit OC'
      this.getOcByNumber();
    } else {
      this.getOcNumber();
    }
  }
  ngAfterViewInIt() {

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
  getOcNumber() {
    this.dashboardService.getOcNumber().subscribe(data => {
      if (data.status === 'success' && data.data != null) {
        this.ocObj.OCNumber = data.data.OCNumber;
      }
    })
  }
  getOcByNumber() {
    let body = {
      OCNumber: this.id,
      roleName: this.currentUser.userRole
    };
    if (this.currentUser.userRole == 'Branch/Dealer') {
      body['branchId'] = this.currentUser.user.branchId;
    }
    this.dashboardService.getOcByNumber(body).subscribe(data => {
      if (data.status === 'success' && data.data != null) {
        this.ocObj = new OcModel();
        this.ocObj = data.data.ocList[0];
        this.installationObj = new Installation();
        this.ocObj.OCDate = this.datePipe.transform(this.ocObj.OCDate, this.dateFormat);
        var minInsDate = new Date(this.ocObj.OCDate);
        var date = new Date(minInsDate.setDate(minInsDate.getDate() + 1));

        // add a day
        this.ocObj.minInstallationDate = this.datePipe.transform(date, this.dateFormat);
        // console.log("sadsa",this.ocObj);
        if (this.currentUser.userRole !== 'Admin' && this.currentUser.userRole !== 'QA Team' && this.ocObj.Installation) {
          this.installationObj = this.ocObj.Installation;
          this.ocObj.Installation.installationDate = this.datePipe.transform(this.ocObj.Installation.installationDate, this.dateFormat);
          this.ocObj.Installation.invoiceDate = this.datePipe.transform(this.ocObj.Installation.invoiceDate, this.dateFormat);
        }
        if (this.ocObj.SpareIDs.length) {
          this.selectedSpare = [];
          this.ocObj.SpareIDs.forEach(ele => {
            this.selectedSpare.push(ele._id);
          })
        }
        if (this.ocObj.SubAssemblyIDs.length) {
          this.selectedSubAssembly = [];
          this.ocObj.SubAssemblyIDs.forEach(ele => {
            this.selectedSubAssembly.push(ele._id);
          })
        }
      }
    });
  }

  ngOnDestroy() {
    this.ocObj$.unsubscribe();
    this.currentUser$.unsubscribe();
  }

  onCancel() {
    localStorage.removeItem('ocObj');
    this.router.navigate(['/pages/dashboard']);
  }
  checkSelected(item) {
    if (this.selectedSubAssembly.findIndex(item._id) > -1) {
      return true;
    } else {
      return false;
    }
  }
  onNext() {
    this.ocObj.SpareIDs = [];
    this.ocObj.SubAssemblyIDs = [];
    this.ocObj.Installation = this.installationObj;
    // console.log('onj', this.installationObj.installationComplete)
    // console.log('onj', this.ocObj)
    if (this.selectedSubAssembly.length) {
      this.selectedSubAssembly.forEach(ele => {
        let i = this.subAssemblyList.findIndex(v => v._id == ele);
        if (i > -1) {
          this.ocObj.SubAssemblyIDs.push(this.subAssemblyList[i]);
        }
      })
    }
    if (this.selectedSpare.length) {
      this.selectedSpare.forEach(ele => {
        let i = this.spareList.findIndex(v => v._id == ele);
        if (i > -1) {
          this.ocObj.SpareIDs.push(this.spareList[i]);
        }
      })
    }
    // console.log('this.ocObj.SerialNumbers', this.ocObj.SerialNumbers)

    if (this.ocObj.SerialNumbers.length) {
      let copySerialNumber = [];
      this.ocObj.SerialNumbers.forEach((ele, index) => {
        let i = this.ocObj.SpareIDs.findIndex(v => v.code == ele.ID);
        if (i > -1) {
          copySerialNumber.push(ele);
        }
        let j = this.ocObj.SubAssemblyIDs.findIndex(v => v.code == ele.ID);
        if (j > -1) {
          copySerialNumber.push(ele);
        }
        if (this.ocObj.ProductID.code == ele.ID) {
          copySerialNumber.push(ele);
        }
      });
      this.ocObj.SerialNumbers = [];
      // console.log('copySerialNumber', copySerialNumber)

      this.ocObj.SerialNumbers = copySerialNumber;
    };
    if (!this.id) {
      this.ocObj.Status = { '_id': 1, 'name': 'New' };
    }
    // console.log('this.ocObj.SerialNumbers', this.ocObj.SerialNumbers)
    this.dashboardService.currentOcObj.next(this.ocObj);
    localStorage.setItem('ocObj', JSON.stringify(this.ocObj));
    if (this.currentUser.userRole === 'Admin' || this.currentUser.userRole === 'QA Team') {
      this.router.navigate(['/pages/dashboard/add-edit-srno']);
    } else {
      this.ocObj.userName = this.currentUser.user.name;
      this.ocObj.roleName = this.currentUser.userRole;
      delete this.ocObj.StatusLog;
      if (this.ocObj._id != undefined) {
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
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && ((charCode < 46 || charCode > 57) || charCode == 47)) {
      return false;
    }
    return true;
  }
  getSubAssembly() {
    this.dashboardService.getSubAssemblyList().subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.subAssemblyList = res.data['subAssemblyList']
      } else {
        this.toasterService.error(res.message);
      }
    })
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
  getStateList() {
    this.dashboardService.getStateList().subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.stateList = res.data['stateList'];
      } else {
        this.toasterService.error(res.message);
      }
    })
  }
  getCountry() {
    this.dashboardService.getCountryList().subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.countryList = res.data['countryList'];
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
  getSpare() {
    this.dashboardService.getSpareList().subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.spareList = res.data['spareList']
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
}
