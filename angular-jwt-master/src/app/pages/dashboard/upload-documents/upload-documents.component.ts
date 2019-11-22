import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OcModel } from '@app/shared/_models/oc-model';
import { AuthenticationService } from '@app/shared/_services/authentication.service';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { environment } from '@environments/environment.prod';
import { LocalDataSource } from 'ng2-smart-table';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],

  providers: [DatePipe]
})
export class UploadDocumentsComponent implements OnInit, OnDestroy {


  fileToUpload: File = null;
  docHash: any = '';
  currentUser$: Subscription;
  currentUser: any;
  id: any;
  ocObj = new OcModel();
  ocObj$: Subscription;
  fileNote = '';
  source: LocalDataSource = new LocalDataSource();
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  isModal = false;
  settings = {
    actions: false,
    columns: {
      srNo: {
        title: 'Sr No',
        filter: false,
        valuePrepareFunction: (cell, row) => { return cell }
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
            return this.datePipe.transform(raw, 'dd/MM/yyyy ');
          }
        }
      },
      _id: {
        title: 'Action',
        filter: false,
        type: 'custom',
        renderComponent: CustomRendererFileDeleteComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe(data => {
            if (data) {
              this.ngOnInit();
            }
          });
        }
      }
    },
  };

  constructor(private dashboardService: DashboardService, private router: Router, private datePipe: DatePipe,
    private authenticationService: AuthenticationService, private route: ActivatedRoute, private toasterService: ToastrService,
    public bsModalRef: BsModalRef
  ) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
      }
    });
    this.ocObj$ = this.dashboardService.selectedObj.subscribe(data => {
      if (data) {
        this.ocObj = data;
        if (this.ocObj.OCDate && this.ocObj.OCDate.formatted) {
          this.ocObj.OCDate = this.ocObj.OCDate.formatted;
          this.isModal = true;
        } else {
          this.ocObj.OCDate = this.datePipe.transform(this.ocObj.OCDate, 'yyyy-MM-dd');
        }
      }
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.isModal) {
      this.id = this.ocObj._id;
    }
    this.getDocuments();
  }

  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
  getDocuments() {
    const body = {
      ocid: this.id
    }
    this.dashboardService.getDocument(body).subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.source.load(res.data.ocDocument);
      } else {
        this.toasterService.error(res.message);
      }
    })
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
  onClose() {
    this.bsModalRef.hide();
  }
  onUploadFile() {
    if (this.fileToUpload != null) {
      const formData: FormData = new FormData();
      formData.append('FileInfo', JSON.stringify({
        ocid: this.id,
        documentname: this.fileToUpload.name,
        uploadedby: this.currentUser.user.name,
        uploadeddate: new Date(),
        notes: this.fileNote
      }));
      formData.append('file', new File([this.fileToUpload], `${this.fileToUpload.name}.`));
      console.log('body', formData);
      this.dashboardService.uploadDocument(formData).subscribe(res => {
        if (res.status === 'success') {
          this.toasterService.success(res.message);
          this.fileNote = '';
          this.fileToUpload = null;
          this.myInputVariable.nativeElement.value = "";
          this.getDocuments();
        } else {
          this.toasterService.error(res.message);
        }
      })
    } else {
      this.toasterService.error('Select File to Upload!!');
    }
  }
  onBack() {
    this.router.navigate(['/pages/dashboard']);
  }
}
@Component({
  selector: 'app-custom-renderer-file',
  template: `<a href="{{url}}" download target="_top" class="font-medium-1 mr-2" style="cursor:pointer;color:blue" >{{value}}</a>`
})
export class CustomRendererFileComponent implements OnInit {
  url = '';
  constructor() {
  }
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  ngOnInit() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    this.url = environment.apiUrl + 'ocDocument/download/' + this.rowData._id;
  }
}
@Component({
  selector: 'app-custom-renderer-file-delete',
  template: `<span (click)="onDelete()" class="font-medium-1 mr-2" style="cursor:pointer;color:blue;font-size:16px" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></span>`
  
})
export class CustomRendererFileDeleteComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private toasterService: ToastrService, private router: Router) {
  }
  @Output() save: EventEmitter<any> = new EventEmitter();
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  ngOnInit() {
    
  }
  onDelete() {
    this.dashboardService.deleteDocument(this.value).subscribe(res => {
      if (res.status === 'success') {
        this.toasterService.success(res.message);
        this.save.emit(true);
      } else {
        this.toasterService.error(res.message);
      }
    })
  }
}