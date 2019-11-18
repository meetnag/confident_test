import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Branch, Customer, CustomerType, Installation, OcModel, Priority, Spare, SubAssembly } from "@app/shared/_models/oc-model";
import { AuthenticationService } from "@app/shared/_services/authentication.service";
import { DashboardService } from "@app/shared/_services/dashboard.service";
import { IMyDpOptions } from "mydatepicker";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscription } from "rxjs";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UploadDocumentsComponent } from "../upload-documents/upload-documents.component";

@Component({
  selector: "app-add-edit-oc",
  templateUrl: "./add-edit-oc.component.html",
  styleUrls: ["./add-edit-oc.component.css"],
  providers: [DatePipe]
})
export class AddEditOcComponent implements OnInit, OnDestroy {
  header = "Add New OC";
  id: any;
  subAssemblyList: SubAssembly[] = [];
  productList = [];
  priorityList: Priority[] = [];
  customerNameList: Observable<Array<Customer[]>>;
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
  dateFormatP = "yyyy-mm-dd";
  dateFormat = "yyyy-MM-dd";
  statuses = ["Direct Sale", "Branch Sale"];
  stateList = [];
  countryList = [];
  selectedProduct = [];
  selectedBranch = "";
  public modalRef: BsModalRef;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: this.dateFormatP,
  };
  lrDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: this.dateFormatP,
  };
  myDatePickerForDisable: IMyDpOptions = {
    dateFormat: this.dateFormatP,
  }
  myDatePickerOptionsInvoice: IMyDpOptions = {
    dateFormat: this.dateFormatP,
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private toasterService: ToastrService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private modalService: BsModalService
  ) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(
      data => {
        if (data != null) {
          this.currentUser = data;
          if (
            this.currentUser.userRole === "Admin" ||
            this.currentUser.userRole === "QA Team"
          ) {
            this.isUpdate = false;
          }
        }
      }
    );
    this.ocObj$ = this.dashboardService.currentOcObj.subscribe(data => {
      if (data) {
        this.ocObj = data;
      }
    });
  }

  ngOnInit() {
    this.customerNameList = this.dashboardService.getCustomersByName({ customerName: "" });

    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(
      window.navigator.userAgent
    );
    if (isIEOrEdge) {
      this.loadScript("../assets/jquery-swap.js");
      this.dateFormatP = "dd/mm/yyyy";
      this.dateFormat = "dd/MM/yyyy";
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
    this.ocObj.ProductID = [];
    this.ocObj.CustomerType = new CustomerType();
    this.ocObj.BranchID = new Branch();
    this.ocObj.Customer = new Customer();
    this.ocObj.Installation = new Installation();
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.header = "Edit OC";
      this.getOcByNumber();
    }
    // else {
    //   this.getOcNumber();
    // }
  }
  ngAfterViewInIt() { }
  public loadScript(url: string) {
    this.dateFormat = "dd/MM/yyyy";
    this.dateFormatP = 'dd/mm/yyyy';
    const body = <HTMLDivElement>document.body;
    const script = document.createElement("script");
    script.innerHTML = "";
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  onTypeOfSaleChange(value) {
    // alert(value)
    if (value == 'Branch Sale') {
      this.ocObj.Customer = new Customer();
      console.log('this', this.ocObj.Customer)
    }
  }
  onOcNumberChange(value) {
    this.dashboardService.checkOcNumber(value).subscribe(data => {
      if (data.status === 'error') {
        this.toasterService.error(data.message);
        this.ocObj.OCNumber = '';
      }
    });
  }
  getOcNumber() {
    this.dashboardService.getOcNumber().subscribe(data => {
      if (data.status === "success" && data.data != null) {
        this.ocObj.OCNumber = data.data.OCNumber;
        // this.toasterService.success('OC Number  '+ this.ocObj.OCNumber + '  generated successfully!')
      }
    });
  }
  getOcByNumber() {
    let body = {
      OCNumber: this.id,
      roleName: this.currentUser.userRole
    };
    if (this.currentUser.userRole == "Branch/Dealer") {
      body["branchId"] = this.currentUser.user.branchId;
    }
    this.dashboardService.getOcByNumber(body).subscribe(data => {
      if (data.status === "success" && data.data != null) {
        this.ocObj = new OcModel();
        this.ocObj = data.data.ocList[0];
        this.installationObj = new Installation();
        if (this.ocObj.Customer && this.ocObj.Customer.name != undefined && this.ocObj.Customer.name != '') {
          this.customerNameList = this.dashboardService.getCustomersByName({ customerName: this.ocObj.Customer.name });
        }
        this.setDateValidations();
        console.log('installationObj.invoiceDate', this.installationObj.invoiceDate)
        // this.ocObj.OCDate = this.datePipe.transform(
        //   this.ocObj.OCDate,
        //   this.dateFormat
        // );
        // console.log("sadsa",this.ocObj);
        this.checkForInstallationobj();
        // && this.ocObj.ProductID._id != ""
        if (this.ocObj.ProductID.length) {
          this.selectedProduct = [];
          this.ocObj.ProductID.forEach(ele => {
            this.selectedProduct.push(ele._id);
          });
        }
        if (this.ocObj.BranchID && this.ocObj.BranchID._id != "") {
          this.selectedBranch = this.ocObj.BranchID._id;
        }
        if (this.ocObj.SpareIDs.length) {
          this.selectedSpare = [];
          this.ocObj.SpareIDs.forEach(ele => {
            this.selectedSpare.push(ele._id);
          });
        }
        if (this.ocObj.SubAssemblyIDs.length) {
          this.selectedSubAssembly = [];
          this.ocObj.SubAssemblyIDs.forEach(ele => {
            this.selectedSubAssembly.push(ele._id);
          });
        }
      }
    });
  }

  setDateValidations() {
    var minInsDate = new Date(this.ocObj.OCDate);
    var date = new Date(minInsDate.setDate(minInsDate.getDate() + 1));
    // add a day
    this.ocObj.minInstallationDate = this.datePipe.transform(
      date,
      this.dateFormat
    );
    this.ocObj.minInstallationDate = this.getFormattedDate(this.ocObj.minInstallationDate);
    this.ocObj.OCDate = this.getFormattedDate(this.ocObj.OCDate);
    if (this.ocObj.LRDate != undefined) {
      this.ocObj.LRDate = this.getFormattedDate(this.ocObj.LRDate);
    }
    let obj: IMyDpOptions = {
      dateFormat: this.dateFormatP,
      disableUntil: this.ocObj.minInstallationDate.date
    };
    this.myDatePickerForDisable = obj;
    console.log('this.ocObj.OCDate.date', this.ocObj.OCDate.date);
    let obj1: IMyDpOptions = {
      dateFormat: this.dateFormatP,
      disableUntil: this.ocObj.OCDate.date
    };
    this.myDatePickerOptionsInvoice = obj1;
  }
  onDateChanged(event) {
    console.log('event', event);
    var minInsDate = new Date(event.jsdate);
    var date = new Date(minInsDate.setDate(minInsDate.getDate() + 1));
    this.ocObj.minInstallationDate = this.datePipe.transform(
      date,
      this.dateFormat
    );
    this.ocObj.minInstallationDate = this.getFormattedDate(this.ocObj.minInstallationDate);
    let obj: IMyDpOptions = {
      dateFormat: this.dateFormatP,
      disableUntil: this.ocObj.minInstallationDate.date
    };
    this.myDatePickerForDisable = obj;
    let obj1: IMyDpOptions = {
      dateFormat: this.dateFormatP,
      disableUntil: event.date
    };
    this.myDatePickerOptionsInvoice = obj1;
  }
  ngOnDestroy() {
    this.ocObj$.unsubscribe();
    this.currentUser$.unsubscribe();
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
  onCancel() {
    localStorage.removeItem("ocObj");
    this.router.navigate(["/pages/dashboard"]);
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
      this.ocObj.SubAssemblyIDs = [];
      this.selectedSubAssembly.forEach(ele => {
        let i = this.subAssemblyList.findIndex(v => v._id == ele);
        if (i > -1) {
          this.ocObj.SubAssemblyIDs.push(this.subAssemblyList[i]);
        }
      });
    }
    if (this.selectedSpare.length) {
      this.ocObj.SpareIDs = [];
      this.selectedSpare.forEach(ele => {
        let i = this.spareList.findIndex(v => v._id == ele);
        if (i > -1) {
          this.ocObj.SpareIDs.push(this.spareList[i]);
        }
      });
    }
    if (this.selectedProduct.length) {
      this.ocObj.ProductID = [];
      console.log(this.selectedProduct)
      this.selectedProduct.forEach(ele => {
        let i = this.productList.findIndex(v => v._id == ele);
        if (i > -1) {
          this.ocObj.ProductID.push(this.productList[i]);
        }
      });
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
        let k = this.ocObj.ProductID.findIndex(v => v.code == ele.ID);
        if (k > -1) {
          copySerialNumber.push(ele);
        }
        // if (this.ocObj.ProductID.code == ele.ID) {
        //   copySerialNumber.push(ele);
        // }
      });
      this.ocObj.SerialNumbers = [];
      // console.log('copySerialNumber', copySerialNumber)

      this.ocObj.SerialNumbers = copySerialNumber;
    }
    if (!this.id) {
      this.ocObj.Status = { _id: 1, name: "New" };
    }
    console.log("this.ocObj", this.ocObj.ProductID);
    this.dashboardService.currentOcObj.next(this.ocObj);
    localStorage.setItem("ocObj", JSON.stringify(this.ocObj));
    if (
      this.currentUser.userRole === "Admin" ||
      this.currentUser.userRole === "QA Team"
    ) {
      this.router.navigate(["/pages/dashboard/add-edit-srno"]);
    } else {
      console.log('date', this.ocObj.OCDate);
      this.ocObj.OCDate = this.ocObj.OCDate.formatted;
      if (this.ocObj.Installation.installationDate != undefined) {
        this.ocObj.Installation.installationDate = this.ocObj.Installation.installationDate.formatted;
      }
      if (this.ocObj.Installation.invoiceDate != undefined) {
        this.ocObj.Installation.invoiceDate = this.ocObj.Installation.invoiceDate.formatted;
      }
      if (this.ocObj.LRDate != undefined) {
        this.ocObj.LRDate = this.ocObj.LRDate.formatted;
      }
      this.ocObj.userName = this.currentUser.user.name;
      this.ocObj.roleName = this.currentUser.userRole;
      delete this.ocObj.StatusLog;
      if (this.ocObj._id != undefined) {
        this.ocObj.UpdatedDate = new Date();
        this.ocObj.Updatedby = this.currentUser.user.name;
        this.dashboardService.updateOc(this.ocObj).subscribe(
          res => {
            if (res.status === "success") {
              this.toasterService.success(res.message);
              this.router.navigate(["/pages/dashboard"]);
            } else {
              this.toasterService.error(res.message);
              this.dashboardService.selectedObj.next(this.ocObj);
              localStorage.setItem('selectedObj', JSON.stringify(this.ocObj));
              this.setDateValidations();
              this.checkForInstallationobj();
              this.modalRef = this.modalService.show(UploadDocumentsComponent);
              // this.router.navigate(['/pages/dashboard/upload/' + this.ocObj._id]);
            }
          },
          err => {
            console.log('err', err);
            this.toasterService.error("Server Error");
          }
        );
      }
    }
  }
  checkForInstallationobj() {
    if (
      this.currentUser.userRole !== "Admin" &&
      this.currentUser.userRole !== "QA Team" &&
      this.ocObj.Installation
    ) {
      // this.ocObj.Installation.installationDate = this.datePipe.transform(
      //   this.ocObj.Installation.installationDate,
      //   this.dateFormat
      // );
      if (this.ocObj.Installation.installationDate != undefined) {
        this.ocObj.Installation.installationDate = this.getFormattedDate(this.ocObj.Installation.installationDate);
      }
      if (this.ocObj.Installation.invoiceDate != undefined) {
        this.ocObj.Installation.invoiceDate = this.getFormattedDate(this.ocObj.Installation.invoiceDate);
      }
      // this.ocObj.Installation.invoiceDate = this.datePipe.transform(
      //   this.ocObj.Installation.invoiceDate,
      //   this.dateFormat
      // );
      console.log('this.oc', this.ocObj.Installation.installationDate);
      this.installationObj = this.ocObj.Installation;
    }
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57 || charCode == 47)) {
      return false;
    }
    return true;
  }
  getSubAssembly() {
    this.dashboardService.getSubAssemblyList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.subAssemblyList = res.data["subAssemblyList"];
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
  getSpare() {
    this.dashboardService.getSpareList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.spareList = res.data["spareList"];
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
  getCustomersByName(name) {
    let body = {
      customerName: name
    };
    // this.customerNameList = this
    //   .http
    //   .post<Observable<Array<any>>>
    //   (environment.apiUrl + 'ocList/getCustomersByName', body);
    // console.log('this', this.customerNameList);
    this.customerNameList = this.dashboardService.getCustomersByName(body);
    console.log('this', this.customerNameList);


    // this.dashboardService.getCustomersByName(body).subscribe(res => {
    //   if (res.status === "success" && res.data) {
    //     console.log('name', res.data);
    //     let data = res.data;
    //     this.customerNameList = data;
    //     // if (data.length) {
    //     //   data.forEach(ele => {
    //     //     let str = ele.name + " , " + ele.address + " , " + ele.city + " , " + ele.state;
    //     //     this.customerNameList.push(str);
    //     //   })
    //     // }
    //   } else {
    //     this.toasterService.error(res.message);
    //   }
    // });
  }
  onCustomerSelected(value) {
    this.ocObj.Customer = value;
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
    console.log("rodu", this.productList);
    console.log("value", value);
    if (this.productList.length) {
      let i = this.productList.findIndex(v => v._id == value);
      if (i > -1) {
        this.ocObj.ProductID = this.productList[i];
        console.log("product", this.ocObj.ProductID);
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
}
