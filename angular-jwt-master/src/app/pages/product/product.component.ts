import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '@app/shared/_models/oc-model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/shared/_services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationAlertComponent } from '@app/shared/_components/confirmation-alert/confirmation-alert.component';
import { AddMasterDataComponent } from '@app/shared/_components/add-master-data/add-master-data.component';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      name: {
        title: 'Name',
        filter: false
      },
      code: {
        title: 'Code',
        filter: false,
      },
      _id: {
        title: 'Actions',
        type: 'custom',
        renderComponent: CustomRendererComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe(data => {
            if (data) {
              this.getProductList();
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
  productList: Product[] = [];
  constructor(private dashboardService: DashboardService, public dialog: MatDialog, private toasterService: ToastrService) { }

  ngOnInit() {
    this.getProductList();
  }
  getProductList() {
    this.dashboardService.getProductList().subscribe(res => {
      if (res.status === "success" && res.data) {
        this.productList = res.data["productList"];
        this.source.load(this.productList);
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
  onAddProduct() {
    const dialogRef = this.dialog.open(AddMasterDataComponent, {
      panelClass: 'app-dialog',
      width: '300px',
    });

    dialogRef.componentInstance.name = '';
    dialogRef.componentInstance.code = '';
    dialogRef.componentInstance.title = 'Add Product';
    dialogRef.componentInstance.button = 'Add';

    dialogRef.afterClosed().subscribe(result => {
      if (result.flag) {
        console.log('reult', result);
        this.dashboardService.createProduct(result.obj).subscribe(res => {
          if (res.status === 'success') {
            this.getProductList();
            this.toasterService.success(res.message);
          } else {
            this.toasterService.error(res.message);
          }
        })
      }
    });
  }
}
@Component({
  selector: 'app-custom-renderer',
  template: `
  <span class="font-medium-1 mr-2" style="cursor:pointer;color:blue; font-size:16px" (click)="onEdit()" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit fa-lg" aria-hidden="true"></i></span>
  <span (click)="onDelete()" class="font-medium-1 mr-2" style="cursor:pointer;color:blue;font-size:16px" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></span>`
})

export class CustomRendererComponent implements OnInit, OnDestroy {
  currentUser$: Subscription;
  currentUser: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog, private dashboardService: DashboardService,
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
  }
  ngOnDestroy() {
  }
  onEdit() {
    const dialogRef = this.dialog.open(AddMasterDataComponent, {
      panelClass: 'app-dialog',
      width: '300px',
    });

    dialogRef.componentInstance.name = this.rowData.name;
    dialogRef.componentInstance.code = this.rowData.code;
    dialogRef.componentInstance.title = 'Edit Product';
    dialogRef.componentInstance.button = 'Update';

    dialogRef.afterClosed().subscribe(result => {
      if (result.flag) {
        console.log('reult', result);
        this.dashboardService.updateProduct(result.obj).subscribe(res => {
          if (res.status === 'success') {
            this.save.emit(true);
            this.toasterService.success(res.message);
          } else {
            this.toasterService.error(res.message);
          }
        })
      }
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationAlertComponent, {
      panelClass: 'app-dialog',
      width: '300px',
    });

    dialogRef.componentInstance.title = `Delete Product`;
    dialogRef.componentInstance.message = `Are you sure, you want to delete this Product?`;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dashboardService.deleteProduct(this.value).subscribe(res => {
          if (res.status === 'success') {
            this.save.emit(true);
            this.toasterService.success(res.message);
          } else {
            this.toasterService.error(res.message);
          }
        })
      }
    });
  }
}