import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/shared/_services';
import { OcModel, Customer, Product } from '@app/shared/_models/oc-model';
import { Subscription } from 'rxjs';
import { environment } from '@environments/environment';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomRendererFileComponent } from '../upload-documents/upload-documents.component';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-oc',
  templateUrl: './view-oc.component.html',
  styleUrls: ['./view-oc.component.css'],
  providers: [DatePipe]
})
export class ViewOcComponent implements OnInit, OnDestroy {
  header = 'View OC';
  ocObj = new OcModel();
  ocObj$: Subscription;
  scanList = [];
  currentUser$: Subscription;
  currentUser: any;
  id: any;
  source: LocalDataSource = new LocalDataSource();
  productList: Product[] = [];

  settings = {
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
        console.log(data);
        if (data.data) {
          this.ocObj = new OcModel();
          this.ocObj.Customer = new Customer();
          this.ocObj.SerialNumbers = [];
          this.ocObj = data.data.ocList[0];
          // var raw = new Date(this.ocObj.OCDate);

          this.ocObj.OCDate = this.datePipe.transform(this.ocObj.OCDate, 'dd/MM/yyyy');
          if (this.ocObj.Installation) {
            this.ocObj.Installation.installationDate = this.datePipe.transform(this.ocObj.Installation.installationDate, 'dd/MM/yyyy ');
            this.ocObj.Installation.invoiceDate = this.datePipe.transform(this.ocObj.Installation.invoiceDate, 'dd/MM/yyyy ');
          }
          this.ocObj.LRDate = this.datePipe.transform(this.ocObj.LRDate, 'dd/MM/yyyy');
          this.ocObj.InvDateByBranch = this.datePipe.transform(this.ocObj.InvDateByBranch, 'dd/MM/yyyy');

          this.getDocuments();
          if (!this.ocObj.Customer) {
            this.ocObj.Customer = new Customer();
            this.ocObj.Customer.city = '';
            this.ocObj.Customer.name = '';
            this.ocObj.Customer.contactNumber = '';
            this.ocObj.Customer.landlineNumber = '';
          }
          // console.log(this.ocObj)
          if (this.ocObj.SerialNumbers.length) {
            this.scanList = [];
            this.ocObj.SerialNumbers.forEach(ele => {
              let isProduct = false;
              // let obj = { 'name': ele.name, 'code': this.ocObj.OCNumber + ele.srno + ele.ID };
              if (this.productList.length) {
                isProduct = this.productList.findIndex(v => v.code == ele.ID) > -1 ? true : false;
              }
              let obj = { 'name': ele.name, 'code': environment.domainUrl + 'scan/' + this.ocObj.OCNumber + ele.srno, 'isProduct': isProduct }
              this.scanList.push(obj);
            })
          }
          // console.log('this.scanList', this.scanList)
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
        this.source.load(res.data.ocDocument);
      } else {
        this.toasterService.error(res.message);
      }
    })
  }
  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
  onClose() {
    this.router.navigate(['/pages/oc-list']);
  }
}
