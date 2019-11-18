import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, NavigationEnd } from '@angular/router';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { AuthenticationService } from '@app/shared/_services';
import { Subscription } from 'rxjs';
import { Priority, OcModel } from '@app/shared/_models/oc-model';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({ templateUrl: 'dashboard.component.html', providers: [DatePipe] })
export class DashboardComponent implements OnInit, OnDestroy {
    ocList: OcModel[] = [];
    dateFormat = 'yyyy-MM-dd';
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
                    // console.log('date', OCDate)
                    if (OCDate) {
                        var raw = new Date(OCDate);
                        if (raw) {
                            return this.datePipe.transform(raw, this.dateFormat);
                        }
                    }
                }
            },
            // ProductID: {
            //     title: 'Product ID',
            //     filter: false,
            //     valuePrepareFunction: (value) => { return value.name }
            // },
            Status: {
                title: 'Status',
                filter: false,
                valuePrepareFunction: (value) => { return value.name }
            },
            _id: {
                title: 'Actions',
                type: 'custom',
                renderComponent: CustomRendererComponent,
                onComponentInitFunction: (instance) => {
                    instance.save.subscribe(data => {
                        if (data) {
                            this.getOcList();
                        }
                    });
                },
                filter: false,
            },
        },
        pager: {
            display: true,
            perPage: 25
        }
    };
    searchOcNo = '';
    currentUser$: Subscription;
    currentUser: any;
    priority = 'all';
    priorityList: Priority[] = [];
    userRole = '';
    navigationSubscription;
    constructor(private router: Router, private dashboardService: DashboardService, private datePipe: DatePipe,
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

            });
    }

    ngOnInit() {
        const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
        if (isIEOrEdge) {
            this.loadScript('../assets/jquery-swap.js');
            this.dateFormat = 'dd/MM/yyyy'
        }
        this.getOcList();
        this.getPriority();
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
        this.navigationSubscription.unsubscribe();
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
    // onSearch(query: string) {
    //     if (query != '') {
    //         this.source.setFilter([
    //             {
    //                 field: 'OC Number',
    //                 search: query
    //             },
    //             {
    //                 field: 'OC Date',
    //                 search: query
    //             },
    //             {
    //                 field: 'Product ID',
    //                 search: query
    //             },
    //             {
    //                 field: 'Status',
    //                 search: query
    //             }
    //         ], false);
    //     } else {
    //         this.source = new LocalDataSource(this.ocList);
    //     }
    // }
}
/*@Component({
    selector: 'app-custom-renderer',
    template: `<span class="font-medium-1 mr-2" style="cursor:pointer;color:blue;margin: 9px;" (click)="editOC()"><i class="fa fa-pencil" aria-hidden="true"></span>
    <span *ngIf="isStatusNew  && !isStatusComplete" class="font-medium-1 mr-2" style="cursor:pointer;color:red;margin: 9px;" (click)="onCloseOC()"><i class="fa fa-exchange" aria-hidden="true"></span>
    <span *ngIf="isStatusNew && isStatusComplete" class="font-medium-1 mr-2" style="cursor:pointer;color:red" (click)="onCloseOC()"><i class="fa fa-trash-o" aria-hidden="true"></span>
    <span class="font-medium-1 mr-2" style="cursor:pointer;color:blue;" (click)="onUploadDocuments()"><i class="fa fa-file-text-o" aria-hidden="true"></span>
    <span *ngIf="isStatusScheduled" class="font-medium-1 mr-2" style="cursor:pointer;color:blue;margin-left: 9px;" (click)="onReport()"><i class="fa fa-file-text-o" aria-hidden="true"></i></span>`
})*/
@Component({
    selector: 'app-custom-renderer',
    template: `<span class="font-medium-1 mr-2" style="cursor:pointer;color:blue; font-size:16px" (click)="editOC()" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-pencil" aria-hidden="true"></i></span>
    <span *ngIf="isStatusNew  && !isStatusComplete" class="font-medium-1 mr-2" style="cursor:pointer;color:blue; font-size:16px" (click)="onCloseOC()" data-toggle="tooltip" data-placement="top" title="Transfer"><i class="fa fa-exchange" aria-hidden="true"></i></span>
    <span *ngIf="isStatusNew && isStatusComplete" class="font-medium-1 mr-2" style="cursor:pointer;color:blue; font-size:16px" (click)="onCloseOC()" data-toggle="tooltip" data-placement="top" title="Close"><i class="fa fa-times" aria-hidden="true"></i></span>
    <span class="font-medium-1 mr-2" style="cursor:pointer;color:blue;font-size:16px" (click)="onUploadDocuments()" data-toggle="tooltip" data-placement="top" title="Upload"><i class="fa fa-upload" aria-hidden="true"></i></span>
    <span *ngIf="isStatusScheduled" class="font-medium-1 mr-2" style="cursor:pointer;color:blue;font-size:16px" (click)="onReport()" data-toggle="tooltip" data-placement="top" title="Installation Report"><i class="fa fa-file-text-o" aria-hidden="true"></i></span>`
})

export class CustomRendererComponent implements OnInit, OnDestroy {
    currentUser$: Subscription;
    currentUser: any;
    isStatusNew = true;
    isStatusComplete = false;
    isStatusScheduled = false;
    @Output() save: EventEmitter<any> = new EventEmitter();
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
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
        if (this.currentUser.userRole === 'QA Team' || this.currentUser.userRole === 'Admin')
            this.isStatusNew = this.rowData.Status.name === 'New' ? true : false;
        if (this.rowData.Status.name == 'Installation Complete') {
            this.isStatusComplete = true;
        }
        if (this.currentUser.userRole == 'Sales Team') {
            if (this.rowData.Status.name == 'In Progress - Branch/Dealer' || this.rowData.Status.name == 'Installation Scheduled') {
                this.isStatusComplete = true;
                this.isStatusNew = false;
            }
        }
        if (this.currentUser.userRole == 'Branch/Dealer') {
            if (this.rowData.Status.name == 'Installation Complete') {
                this.isStatusComplete = true;
                this.isStatusNew = true;
            } else {
                this.isStatusComplete = false;
                this.isStatusNew = false;
            }
        }
        if (this.rowData.Status.name == 'Installation Scheduled') {
            this.isStatusScheduled = true;
        }
    }
    ngOnDestroy() {
        this.currentUser$.unsubscribe();
    }
    editOC() {
        this.router.navigate(['/pages/dashboard/edit-oc/' + this.rowData.OCNumber]);
    }
    onReport() {
        this.router.navigate(['/pages/dashboard/report/' + this.rowData.OCNumber]);
    }
    onCloseOC() {
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
                body['branchId'] = this.rowData.BranchID._id;
            }
        }
        if (this.rowData.Installation && this.rowData.Installation.installationComplete) {
            body['installationComplete'] = this.rowData.Installation.installationComplete;
        }

        this.dashboardService.onStatusChange(body).subscribe(res => {
            if (res.status === 'success') {
                this.save.emit(true);
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