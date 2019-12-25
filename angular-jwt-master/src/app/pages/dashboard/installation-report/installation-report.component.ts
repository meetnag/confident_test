import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OcModel, Customer, Product } from '@app/shared/_models/oc-model';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/shared/_services';
import { environment } from '@environments/environment';
import { Subscription } from 'rxjs';
import { CustomRendererFileComponent } from '../upload-documents/upload-documents.component';

@Component({
  selector: 'app-installation-report',
  templateUrl: './installation-report.component.html',
  styleUrls: ['./installation-report.component.css'],
  providers: [DatePipe]
})
export class InstallationReportComponent implements OnInit, OnDestroy {
  header = 'OC Report';
  ocObj = new OcModel();
  scanList = [];
  id: any;
  source: LocalDataSource = new LocalDataSource();
  currentUser$: Subscription;
  currentUser: any;
  isPrinting = false;
  productList: Product[] = [];
  settings = {
    actions: false,
    columns: {
      ID: {
        title: 'Code',
        filter: false,
        type: 'custom',
        renderComponent: CustomRendererReportViewComponent
      },
      name: {
        title: 'Description',
        filter: false,
        type: 'custom',
        renderComponent: CustomRendererReportViewComponent
      },
      srno: {
        title: 'SR No.',
        filter: false,
        type: 'custom',
        renderComponent: CustomRendererReportViewComponent
      },
      // _id: {
      //   title: 'QR Code',
      //   filter: false,
      //   type: 'custom',
      //   renderComponent: CustomRendererReportComponent
      // },
    },
    pager: {
      display: false,
      // perPage: 25
    }
  };
  documentSource: LocalDataSource = new LocalDataSource();

  documentSettings = {
    actions: false,
    columns: {
      srNo: {
        title: 'Sr No',
        filter: false,
        valuePrepareFunction: (cell, row) => {
          return cell
        }
      },
      documentname: {
        title: 'Document Name',
        filter: false,
        type: 'custom',
        renderComponent: CustomRendererFileComponent
      },
      notes: {
        title: 'Notes',
        filter: false
      },
      uploadedby: {
        title: 'Uploaded By',
        filter: false
      },
      uploadeddate: {
        title: 'Uploaded Date',
        filter: false,
        valuePrepareFunction: (OCDate) => {
          var raw = new Date(OCDate);
          if (raw) {
            return this.datePipe.transform(raw, 'dd/MM/yyyy');
          }
        }
      }
    },
  };
  constructor(private router: Router, private route: ActivatedRoute, private dashboardService: DashboardService, private datePipe: DatePipe,
    private toasterService: ToastrService, private authenticationService: AuthenticationService) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
      }
    })
  }

  ngOnInit() {
    this.getProduct();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOcByNumber();
  }
  ngOnDestroy() {
    this.currentUser$.unsubscribe();
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
        // console.log(data);
        if (data.data) {
          this.ocObj = new OcModel();
          this.ocObj.Customer = new Customer();
          this.ocObj.SerialNumbers = [];
          this.ocObj = data.data.ocList[0];
          // var raw = new Date(this.ocObj.OCDate);

          this.ocObj.OCDate = this.datePipe.transform(this.ocObj.OCDate, 'dd/MM/yyyy ');
          if (this.ocObj.Installation) {
            this.ocObj.Installation.installationDate = this.datePipe.transform(this.ocObj.Installation.installationDate, 'dd/MM/yyyy ');
            this.ocObj.Installation.invoiceDate = this.datePipe.transform(this.ocObj.Installation.invoiceDate, 'dd/MM/yyyy ');

          }
          this.getDocuments();
          this.ocObj.LRDate = this.datePipe.transform(this.ocObj.LRDate, 'dd/MM/yyyy ');
          this.ocObj.InvDateByBranch = this.datePipe.transform(this.ocObj.InvDateByBranch, 'dd/MM/yyyy ');
          if (!this.ocObj.Customer) {
            this.ocObj.Customer = new Customer();
            this.ocObj.Customer.city = '';
            this.ocObj.Customer.name = '';
            this.ocObj.Customer.contactNumber = '';
            this.ocObj.Customer.landlineNumber = '';
          }
          if (this.ocObj.SerialNumbers.length) {
            this.ocObj.SerialNumbers.forEach(ele => {
              ele["OCNumber"] = this.ocObj.OCNumber;
              if (this.productList.length) {
                ele["isProduct"] = this.productList.findIndex(v => v.code == ele.ID) > -1 ? true : false;
              }
            })
          }
          console.log('this', this.ocObj.SerialNumbers)
          this.source.load(this.ocObj.SerialNumbers);
          // if (this.ocObj.SerialNumbers.length) {
          //   this.scanList = [];
          //   this.ocObj.SerialNumbers.forEach(ele => {
          //     let obj = { 'name': ele.name, 'code': environment.domainUrl + 'scan/' + this.ocObj.OCNumber }
          //     this.scanList.push(obj);
          //   })
          // }
        }
      }
    });
  }
  getDocuments() {
    const body = {
      ocid: this.ocObj._id
    }
    this.dashboardService.getDocument(body).subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.documentSource.load(res.data.ocDocument);
      } else {
        this.toasterService.error(res.message);
      }
    })
  }
  onPrint() {
    window.print();
  }
  onClose() {
    this.router.navigate(['/pages/oc-list']);
  }
}
@Component({
  selector: 'app-report-renderer',
  template: `<qrcode [qrdata]="qrcode" [size]="50" [level]="'M'"></qrcode>`
})
export class CustomRendererReportComponent implements OnInit {

  constructor(private router: Router) { }
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  qrcode = '';
  ngOnInit() {
    this.qrcode = environment.domainUrl + 'scan/' + this.rowData.OCNumber + this.rowData.srno
  }

}
@Component({
  selector: 'app-report-view-renderer',
  template: `<b *ngIf = "rowData.isProduct">{{value}}</b> <span *ngIf="!rowData.isProduct">{{value}}</span>`
})
export class CustomRendererReportViewComponent implements OnInit {

  constructor(private router: Router) { }
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  ngOnInit() {
  }

}
