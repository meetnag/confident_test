import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  OcModel,
  Priority,
  CustomerType,
  Branch
} from "@app/shared/_models/oc-model";
import { Subscription } from "rxjs";
import { DashboardService } from "@app/shared/_services/dashboard.service";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "@app/shared/_services";
import { DatePipe } from "@angular/common";
import { environment } from "@environments/environment";
import { IMyDpOptions } from "mydatepicker";

@Component({
  selector: "app-add-edit-oc-labels",
  templateUrl: "./add-edit-oc-labels.component.html",
  styleUrls: ["./add-edit-oc-labels.component.css"],
  providers: [DatePipe]
})
export class AddEditOcLabelsComponent implements OnInit, OnDestroy {
  header = "Generate Labels";
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
  isPrinting = false;
  dateFormat = "yyyy-MM-dd";
  dateFormatP = "yyyy-mm-dd";
  stateList: any = [];
  countryList = [];
  selectedProduct = "";
  selectedBranch = '';
  statuses = ["Direct Sale", "Branch Sale"];
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: this.dateFormatP,
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private toasterService: ToastrService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe
  ) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(
      data => {
        if (data != null) {
          this.currentUser = data;
        }
      }
    );
    this.ocObj$ = this.dashboardService.currentOcObj.subscribe(data => {
      if (data) {
        this.ocObj = new OcModel();
        this.ocObj.SerialNumbers = [];
        this.ocObj = data;
        // this.ocObj.OCDate = this.datePipe.transform(
        //   this.ocObj.OCDate,
        //   this.dateFormat
        // );
        // if (this.ocObj.ProductID && this.ocObj.ProductID._id != "") {
        //   this.selectedProduct = this.ocObj.ProductID._id;
        // }
        if (this.ocObj.BranchID && this.ocObj.BranchID._id != "") {
          this.selectedBranch = this.ocObj.BranchID._id;
        }
        if (this.ocObj.SerialNumbers.length) {
          this.scanList = [];
          this.ocObj.SerialNumbers.forEach(ele => {
            // let obj = { 'name': ele.name, 'code': this.ocObj.OCNumber + ele.srno + ele.ID };
            let obj = {
              name: ele.name,
              code: environment.domainUrl + "scan/" + this.ocObj.OCNumber + ele.srno
            };
            this.scanList.push(obj);
          });
        }
      }
    });
  }

  ngOnInit() {
    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(
      window.navigator.userAgent
    );
    if (isIEOrEdge) {
      this.loadScript("../assets/jquery-swap.js");
      this.dateFormat = "dd/MM/yyyy";
      this.dateFormatP = "dd/mm/yyyy";
    }
    this.getPriority();
    this.getCustomerType();
    this.getProduct();
    this.getBranch();
    this.getStateList();
    this.getCountry();
    this.myAngularxQrCode = "Your QR code data string";
  }
  ngAfterViewInIt() { }
  public loadScript(url: string) {
    this.dateFormat = "dd/MM/yyyy";
    this.dateFormatP = "dd/mm/yyyy";
    const body = <HTMLDivElement>document.body;
    const script = document.createElement("script");
    script.innerHTML = "";
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  ngOnDestroy() {
    this.ocObj$.unsubscribe();
    this.currentUser$.unsubscribe();
  }

  onCancel() {
    localStorage.removeItem("ocObj");
    this.router.navigate(["/pages/oc-list"]);
  }
  onSave() {
    this.ocObj.userName = this.currentUser.user.name;
    this.ocObj.roleName = this.currentUser.userRole;
    delete this.ocObj.StatusLog;
    console.log('date', this.ocObj.OCDate);
    this.ocObj.OCDate = this.ocObj.OCDate.formatted;
    console.log('date', this.ocObj.OCDate);
    if (this.ocObj.Installation.installationDate != undefined) {
      this.ocObj.Installation.installationDate = this.ocObj.Installation.installationDate.formatted;
    }
    if (this.ocObj.Installation.invoiceDate != undefined) {
      this.ocObj.Installation.invoiceDate = this.ocObj.Installation.invoiceDate.formatted;
    }
    if (this.ocObj.LRDate != undefined) {
      this.ocObj.LRDate = this.ocObj.LRDate.formatted;
    }
    if (this.ocObj._id == undefined) {
      this.ocObj.CreatedDate = new Date();
      this.ocObj.Createdby = this.currentUser.user.name;
      this.dashboardService.addOc(this.ocObj).subscribe(
        res => {
          if (res.status === "success") {
            this.toasterService.success('OC Number  ' + this.ocObj.OCNumber + '  created successfully!')
            // window.print();
            this.router.navigate(["/pages/oc-list"]);
          } else {
            this.toasterService.error(res.message);
            this.router.navigate(["/pages/oc-list"]);
          }
        },
        err => {
          this.toasterService.error("Server Error");
        }
      );
    } else {
      this.ocObj.UpdatedDate = new Date();
      this.ocObj.Updatedby = this.currentUser.user.name;
      this.dashboardService.updateOc(this.ocObj).subscribe(
        res => {
          if (res.status === "success") {
            this.toasterService.success(res.message);
            // window.print();
            this.router.navigate(["/pages/oc-list"]);
          } else {
            this.toasterService.error(res.message);
            this.router.navigate(["/pages/oc-list"]);
          }
        },
        err => {
          this.toasterService.error("Server Error");
        }
      );
    }
  }
  onPrint() {
    window.print();
    // this.router.navigate(['/pages/oc-list']);
  }
  getStateList() {
    this.dashboardService.getStateList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.stateList = res.data["stateList"];
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
  getCountry() {
    this.dashboardService.getCountryList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.countryList = res.data["countryList"];
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
  getProduct() {
    this.dashboardService.getProductList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.productList = res.data["productList"];
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
  getBranch() {
    this.dashboardService.getBranchList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.branchList = res.data["branchList"];
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
  getPriority() {
    this.dashboardService.getPriorityList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.priorityList = res.data["priorityList"];
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
  getCustomerType() {
    this.dashboardService.getCustomerTypeList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.customerTypeList = res.data["customerTypeList"];
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
  onPriorityChange() {
    if (this.priorityList.length) {
      let i = this.priorityList.findIndex(
        v => v._id == this.ocObj.Priority._id
      );
      if (i > -1) {
        this.ocObj.Priority = this.priorityList[i];
      }
    }
  }
  onProductChange(value) {
    if (this.productList.length) {
      let i = this.productList.findIndex(v => v._id == value);
      if (i > -1) {
        this.ocObj.ProductID = this.productList[i];
      }
    }
  }

  onCustomerTypeChange() {
    if (this.customerTypeList.length) {
      let i = this.customerTypeList.findIndex(
        v => v._id == this.ocObj.CustomerType._id
      );
      if (i > -1) {
        this.ocObj.CustomerType = this.customerTypeList[i];
      }
    }
  }
  onBranchChange(value) {
    if (this.branchList.length) {
      let i = this.branchList.findIndex(v => v._id == value);
      if (i > -1) {
        this.ocObj.BranchID = this.branchList[i];
      }
    }
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57 || charCode == 47)) {
      return false;
    }
    return true;
  }
}
