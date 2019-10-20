import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/shared/_services';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OcModel } from '@app/shared/_models/oc-model';

@Component({
  selector: 'app-oc-upload',
  templateUrl: './oc-upload.component.html',
  styleUrls: ['./oc-upload.component.css']
})
export class OcUploadComponent implements OnInit, OnDestroy {
  fileToUpload: File = null;
  docHash: any = '';
  fileNote = '';
  myInputVariable: ElementRef;
  currentUser$: Subscription;
  currentUser: any;
  productList = [];
  ocList: OcModel[] = [];
  selectedProduct = '';
  selectedOc = [];
  ocFilterList = [];
  constructor(private dashboardService: DashboardService, private router: Router,
    private authenticationService: AuthenticationService, private route: ActivatedRoute, private toasterService: ToastrService,
  ) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
      }
    });
  }


  ngOnInit() {
    this.getProduct();
    this.getOcList();
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
  getOcList() {
    let body;
    body = {
      roleName: this.currentUser.userRole
    };
    if (this.currentUser.userRole === 'Branch/Dealer') {
      body.branchId = this.currentUser.user.branchId;
    }
    this.dashboardService.getOcList(body).subscribe(data => {
      if (data.status === 'success') {
        this.ocList = data.data.ocList;
      }
    });
  }
  handleFileInput(files) {
    this.fileToUpload = files[0];
    console.log(this.fileToUpload);
    var reader = new FileReader();
    reader.readAsBinaryString(this.fileToUpload);

    reader.onload = () => {
      this.docHash = btoa(reader.result as string);
    };

  }
  // onProductChange(value) {
  //   this.ocFilterList = [];
  //   if (this.ocList.length) {
  //     this.ocList.forEach(ele => {
  //       if (ele.ProductID.length) {
  //         let i = ele.ProductID.findIndex(v => v._id == this.selectedProduct);
  //         if (i > -1) {
  //           this.ocFilterList.push(ele);
  //         }
  //       }
  //     })
  //   }
  // }
  onUploadFile() {
    if (this.fileToUpload != null) {
      console.log('this.sele', this.selectedOc);
      let successCounter = 0;
      let resSuccessMsg = '';
      let resErrorMsg = '';
      if (this.selectedOc.length) {
        this.selectedOc.forEach((ele, index) => {
          const formData: FormData = new FormData();
          formData.append('FileInfo', JSON.stringify({
            ocid: ele,
            documentname: this.fileToUpload.name,
            uploadedby: this.currentUser.user.name,
            uploadeddate: new Date(),
            notes: this.fileNote
          }));
          formData.append('file', new File([this.fileToUpload], `${this.fileToUpload.name}.`));
          console.log('body', formData);
          this.dashboardService.uploadDocument(formData).subscribe(res => {
            if (res.status === 'success') {
              resSuccessMsg = res.message;
              successCounter++;
              if (successCounter == this.selectedOc.length && index == this.selectedOc.length - 1) {
                this.toasterService.success(resSuccessMsg);
                // this.selectedProduct = '';
                this.selectedOc = [];
                this.fileNote = '';
                this.fileToUpload = null;
                this.myInputVariable.nativeElement.value = "";
              }
            } else {
              resErrorMsg = res.message;
              if (successCounter !== this.selectedOc.length && index == this.selectedOc.length - 1) {
                this.toasterService.error(resErrorMsg);
              }
            }
          })
          // if (successCounter == this.selectedOc.length && index == this.selectedOc.length - 1) {
          //   this.toasterService.success(resSuccessMsg);
          //   this.fileNote = '';
          //   this.fileToUpload = null;
          //   this.myInputVariable.nativeElement.value = "";
          // } else if (successCounter !== this.selectedOc.length && index == this.selectedOc.length - 1) {
          //   this.toasterService.error(resErrorMsg);
          // }
        })

      }

    } else {
      this.toasterService.error('Select File to Upload!!');
    }
  }
  onBack() {
    this.router.navigate(['/pages/dashboard']);
  }
}
