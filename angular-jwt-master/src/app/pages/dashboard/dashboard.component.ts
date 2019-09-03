import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, NavigationEnd } from '@angular/router';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { AuthenticationService } from '@app/shared/_services';
import { Subscription } from 'rxjs';
import { Priority, OcModel } from '@app/shared/_models/oc-model';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

@Component({ templateUrl: 'dashboard.component.html' })
export class DashboardComponent implements OnInit, OnDestroy {
    ocList: OcModel[] = [];
    source: LocalDataSource = new LocalDataSource();
    settings = {
        actions: false,
        columns: {
            OCNumber: {
                title: 'OC Number',
                type: 'custom',
                renderComponent: CustomRendererViewComponent,
                // onComponentInitFunction: (instance: any) => {
                //     // if (instance.retry) {
                //     instance.retry.on(row => {
                //         this.getOcList();
                //     });
                //     // }
                // },
                filter: false
            },
            OCDate: {
                title: 'OC Date',
                filter: false
            },
            ProductID: {
                title: 'Product ID',
                filter: false,
                valuePrepareFunction: (value) => { return value.name }
            },
            Status: {
                title: 'Status',
                filter: false,
                valuePrepareFunction: (value) => { return value.name }
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
    currentUser$: Subscription;
    currentUser: any;
    priority = 'all';
    priorityList: Priority[] = [];
    userRole = '';
    navigationSubscription;
    constructor(private router: Router, private dashboardService: DashboardService,
        private authenticationService: AuthenticationService) {
        this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
            if (data != null) {
                this.currentUser = data;
                this.userRole = this.currentUser.userRole;
            }
        })
        this.navigationSubscription = router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => {
                this.getOcList();
                this.getPriority();
            });
    }

    ngOnInit() {
        this.getOcList();
        this.getPriority();
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
        this.dashboardService.getOcList(body).subscribe(data => {
            if (data.status === 'success') {
                this.ocList = data.data.ocList;
                this.source.load(this.ocList);
            }
        });
    }
    onAddOc() {
        this.router.navigate(['/pages/dashboard/add-oc']);
    }
}
@Component({
    selector: 'app-custom-renderer',
    template: `<span class="font-medium-1 mr-2" style="cursor:pointer;color:blue" (click)="editOC()">Edit</span>
    <span *ngIf="isStatusNew" class="font-medium-1 mr-2" style="cursor:pointer;color:red" (click)="onCloseOC()">Transfer</span>
    <span class="font-medium-1 mr-2" style="cursor:pointer;" (click)="onUploadDocuments()">Supporting Documents</span>`
})
export class CustomRendererComponent implements OnInit, OnDestroy {
    currentUser$: Subscription;
    currentUser: any;
    isStatusNew = true;
    // @Output() retry: EventEmitter<any> = new EventEmitter()
    constructor(private router: Router, private dashboardService: DashboardService,
        private toasterService: ToastrService, private authenticationService: AuthenticationService) {
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
        if (this.currentUser.userRole === 'QA Team' || this.currentUser.userRole === 'Admin')
            this.isStatusNew = this.rowData.Status.name === 'New' ? true : false;
    }
    ngOnDestroy() {
        this.currentUser$.unsubscribe();
    }
    editOC() {
        this.router.navigate(['/pages/dashboard/edit-oc/' + this.rowData.OCNumber]);
    }
    onCloseOC() {
        console.log('raw', this.rowData);
        let body;
        let installationComplete = '';
        body = {
            ocId: this.value,
            roleName: this.currentUser.userRole,
            status: this.rowData.Status.name,
            userName: this.currentUser.user.name
        };
        if (this.currentUser.userRole !== 'Branch/Dealer') {
            if (this.rowData.BranchID._id !== '') {
                body['branchName'] = this.rowData.BranchID.name;
            }
        }
        if (this.rowData.Installation && this.rowData.Installation.installationComplete) {
            body['installationComplete'] = this.rowData.Installation.installationComplete;
        }

        console.log('on close', body);
        this.dashboardService.onStatusChange(body).subscribe(res => {
            if (res.status === 'success') {
                // this.retry.emit(this.rowData);
                this.router.navigate(['/pages/dashboard'], { queryParams: { page: new Date() } });
                this.toasterService.success(res.message);
            } else {
                this.toasterService.error(res.message);
            }
        })
    }
    onUploadDocuments() {
        this.dashboardService.selectedObj.next(this.rowData);
        localStorage.setItem('selectedObj', JSON.stringify(this.rowData));
        this.router.navigate(['/pages/dashboard/upload/' + this.value]);
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
        this.router.navigate(['/pages/dashboard/view-oc/' + this.rowData.OCNumber]);
    }
}