import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { Priority } from '@app/shared/_models/oc-model';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { AuthenticationService } from '@app/shared/_services/authentication.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-oc-history',
  templateUrl: './oc-history.component.html',
  styleUrls: ['./oc-history.component.css'],
  providers: [DatePipe]
})
export class OcHistoryComponent implements OnInit, OnDestroy {

  ocList = [];
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      OCNumber: {
        title: 'OC Number',
        type: 'custom',
        renderComponent: CustomRendererViewComponent,
        filter: false
      },
      OCDate: {
        title: 'OC Date',
        filter: false,
        valuePrepareFunction: (OCDate) => {
          var raw = new Date(OCDate);
          if (raw) {
            return this.datePipe.transform(raw, 'dd/MM/yyyy hh:mm a');
          }
        }
      },
      UpdatedDate: {
        title: 'Installation Complete Date',
        filter: false,
        valuePrepareFunction: (UpdatedDate) => {
          var raw = new Date(UpdatedDate);
          if (raw) {
            return this.datePipe.transform(raw, 'dd/MM/yyyy hh:mm a');
          }
        }
      },
      _id: {
        title: 'Actions',
        type: 'custom',
        renderComponent: CustomRendererComponent,
        filter: false,
      },
    },
  };
  searchOcNo = '';
  priority = 'all';
  priorityList: Priority[] = [];
  currentUser$: Subscription;
  currentUser: any;
  userRole = '';
  typeOfSale = '';
  selectedBranch = '';
  branchList: any = [];

  constructor(private router: Router, private dashboardService: DashboardService, private datePipe: DatePipe,
    private authenticationService: AuthenticationService) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
        this.userRole = this.currentUser.userRole;
      }
    })
  }

  ngOnInit() {
    this.getOcList();
    this.getPriority();
    this.getBranch();
  }

  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
  getPriority() {
    this.dashboardService.getPriorityList().subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.priorityList = res.data['priorityList'];
      }
    })
  }
  getBranch() {
    this.dashboardService.getBranchList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.branchList = res.data["branchList"];
      }
    });
  }

  onTypeOfSaleChange() {
    this.getOcList();
  }
  onBranchChange() {
    this.getOcList();
  }
  onPriorityChange() {
    this.getOcList();
  }
  getOcList() {
    let body;
    if (this.priority === 'all') {
      body = {
        roleName: this.currentUser.userRole
      };
    } else {
      body = {
        Priority: this.priority,
        roleName: this.currentUser.userRole
      };
    }
    if (this.currentUser.userRole === 'Branch/Dealer') {
      body.branchId = this.currentUser.user.branchId;
    }
    // if(this.typeOfSale != ''){
    //     body.typeOfSale = this.typeOfSale;
    // }
    this.dashboardService.getOcArchives(body).subscribe(data => {
      if (data.status === 'success') {
        this.ocList = data.data.ocList;
        this.source.load(this.ocList);
      }
    });
  }

  onOcNumberChange() {
    if (this.searchOcNo != '') {
      let list = [];
      list = this.ocList.filter(v => v.OCNumber == this.searchOcNo);
      this.source.load(list);
    } else {
      this.source.load(this.ocList)
    }
  }
  onResetFilter() {
    this.selectedBranch = '';
    this.typeOfSale = '';
    this.priority = 'all';
    this.getOcList();
  }
}
@Component({
  selector: 'app-custom-renderer',
  template: `  <span class="font-medium-1 mr-2" style="cursor:pointer;"  data-toggle="tooltip" data-placement="top" title="Upload" (click)="onUploadDocuments()"><i class="fa fa-upload" aria-hidden="true"></i></span>
  <span *ngIf="!isStatusScheduled" class="font-medium-1 mr-2"  data-toggle="tooltip" data-placement="top" title="Installation Report" style="cursor:pointer;color:blue;font-size:16px" (click)="onReport()" data-toggle="tooltip" data-placement="top" title="Installation Report"><i class="fa fa-file-text-o" aria-hidden="true"></i></span>`
})
export class CustomRendererComponent implements OnInit, OnDestroy {
  currentUser$: Subscription;
  currentUser: any;
  isStatusScheduled = false;
  constructor(private router: Router, private authenticationService: AuthenticationService, private dashboardService: DashboardService) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
      }
    })
  }
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    // if (this.rowData.Status.name == 'Installation Scheduled') {
    //   this.isStatusScheduled = true;
    // }
  }
  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
  onReport() {
    this.router.navigate(['/pages/oc-list/report/' + this.rowData.OCNumber]);
  }
  onUploadDocuments() {
    this.dashboardService.selectedObj.next(this.rowData);
    localStorage.setItem('selectedObj', JSON.stringify(this.rowData));
    this.router.navigate(['/pages/oc-list/upload/' + this.value]);
  }
}
@Component({
  selector: 'app-custom-renderer',
  template: `<span class="font-medium-1 mr-2" style="cursor:pointer;color:blue" (click)="onViewOc()">{{value}}</span>`
})
export class CustomRendererViewComponent implements OnInit {

  constructor(private router: Router) { }
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  ngOnInit() {

  }

  onViewOc() {
    this.router.navigate(['/pages/oc-list/view-oc/' + this.rowData.OCNumber]);
  }

}