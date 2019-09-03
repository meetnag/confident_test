import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/shared/_services';
import { OcModel, Customer } from '@app/shared/_models/oc-model';
import { Subscription } from 'rxjs';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-view-oc',
  templateUrl: './view-oc.component.html',
  styleUrls: ['./view-oc.component.css']
})
export class ViewOcComponent implements OnInit, OnDestroy {
  header = 'View OC';
  ocObj = new OcModel();
  ocObj$: Subscription;
  scanList = [];
  currentUser$: Subscription;
  currentUser: any;
  id: any;

  constructor(private router: Router, private route: ActivatedRoute, private dashboardService: DashboardService,
    private toasterService: ToastrService, private authenticationService: AuthenticationService) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
      }
    })
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOcByNumber();

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
          if (!this.ocObj.Customer) {
            this.ocObj.Customer = new Customer();
            this.ocObj.Customer.city = '';
            this.ocObj.Customer.name = '';
            this.ocObj.Customer.contactNumber = '';
          }
          // console.log(this.ocObj)
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
      }
    });
  }
  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
  onClose() {
    this.router.navigate(['/pages/dashboard']);
  }
}
