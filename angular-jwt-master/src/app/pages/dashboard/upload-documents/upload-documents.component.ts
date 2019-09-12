import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { AuthenticationService } from '@app/shared/_services/authentication.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalDataSource } from 'ng2-smart-table';
import { OcModel } from '@app/shared/_models/oc-model';
import { environment } from '@environments/environment.prod';

import { DatePipe } from '@angular/common';
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

  constructor(private dashboardService: DashboardService, private router: Router,private datePipe: DatePipe,
    private authenticationService: AuthenticationService, private route: ActivatedRoute, private toasterService: ToastrService,
  ) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
      }
    });
    this.ocObj$ = this.dashboardService.selectedObj.subscribe(data => {
      if (data) {
        this.ocObj = data;
        this.ocObj.OCDate = this.datePipe.transform(this.ocObj.OCDate, 'dd/MM/yyyy ');
      }
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
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
    this.url = environment.apiUrl + 'ocDocument/download/' + this.rowData._id;
  }
}
@Component({
  selector: 'app-custom-renderer-file-delete',
  template: `<span (click)="onDelete()" class="font-medium-1 mr-2" style="cursor:pointer;color:red">X</span>`
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