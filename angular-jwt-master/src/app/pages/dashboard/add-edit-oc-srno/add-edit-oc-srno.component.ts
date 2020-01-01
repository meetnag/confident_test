import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { DashboardService } from '@app/shared/_services/dashboard.service';
import { OcModel } from '@app/shared/_models/oc-model';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-add-edit-oc-srno',
  templateUrl: './add-edit-oc-srno.component.html',
  styleUrls: ['./add-edit-oc-srno.component.css'],
  providers: [DatePipe]
})
export class AddEditOcSrnoComponent implements OnInit, OnDestroy {

  id: any;
  header = 'SR No';
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      ID: {
        title: 'Code',
        filter: false
      },
      name: {
        title: 'Description',
        filter: false
      },
      srno: {
        title: 'Sr No',
        filter: false,
        type: 'custom',
        renderComponent: CustomRendererSrNoComponent,
      }
    },
  };
  ocObj = new OcModel();
  ocObj$: Subscription;
  data = [];
  dateFormat = 'yyyy-MM-dd';
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  };
  constructor(private router: Router, private route: ActivatedRoute, private dashboardService: DashboardService,
    private datePipe: DatePipe) {
    this.ocObj$ = this.dashboardService.currentOcObj.subscribe(data => {
      if (data) {
        this.ocObj = new OcModel();
        this.ocObj.SerialNumbers = [];
        this.ocObj = data;
        // this.ocObj.OCDate = this.datePipe.transform(this.ocObj.OCDate, this.dateFormat);
        this.data = [];
        if (this.ocObj.SerialNumbers && this.ocObj.SerialNumbers.length) {
          this.ocObj.SerialNumbers.forEach(ele => {
            this.data.push(ele);
          });
        }
        console.log('this.data',this.data);
        // if (this.ocObj.ProductID._id != '' && this.ocObj.SerialNumbers && (this.ocObj.SerialNumbers.findIndex(v => v.ID == this.ocObj.ProductID.code) < 0)) {
        //   this.data.push({ 'ID': this.ocObj.ProductID.code, 'name': this.ocObj.ProductID.name, 'srno': '' })
        // }
        if (this.ocObj.ProductID && this.ocObj.ProductID.length && this.ocObj.SerialNumbers) {
          this.ocObj.ProductID.forEach((ele, index) => {
            if ((this.ocObj.SerialNumbers.findIndex(v => v.ID == ele.code) < 0)) {
              this.data.push({ 'ID': ele.code, 'name': ele.name, 'srno': '' })
            }
          });
        }
        if (this.ocObj.SubAssemblyIDs && this.ocObj.SubAssemblyIDs.length && this.ocObj.SerialNumbers) {
          this.ocObj.SubAssemblyIDs.forEach((ele, index) => {
            if ((this.ocObj.SerialNumbers.findIndex(v => v.ID == ele.code) < 0)) {
              this.data.push({ 'ID': ele.code, 'name': ele.name, 'srno': '' })
            }
          });
        }
        if (this.ocObj.SpareIDs && this.ocObj.SpareIDs.length && this.ocObj.SerialNumbers) {
          this.ocObj.SpareIDs.forEach((ele, index) => {
            if ((this.ocObj.SerialNumbers.findIndex(v => v.ID == ele.code) < 0)) {
              this.data.push({ 'ID': ele.code, 'name': ele.name, 'srno': '' })
            }
          });
        }
        this.source.load(this.data);
        // console.log('this.sr', this.ocObj)
      }
    })
  }

  ngOnInit() {
    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
    if (isIEOrEdge) {
      this.loadScript('../../../../assets/jquery-swap.js');
      this.dateFormat = 'dd/MM/yyyy'
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.source.load(this.data);
  }
  ngAfterViewInIt() {

  }
  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  onAddSrNo(value, row, index) {
    this.data[index].srno = value
    let obj = { 'ID': row.ID, 'name': row.name, 'srno': value };
    if (this.ocObj.SerialNumbers.length) {
      let i = this.ocObj.SerialNumbers.findIndex(v => v.ID == row.ID);
      if (i > -1) {
        this.ocObj.SerialNumbers[i] = obj;
      } else {
        this.ocObj.SerialNumbers.push(obj);
      }
    } else {
      this.ocObj.SerialNumbers = [];
      this.ocObj.SerialNumbers.push(obj);
    }
    this.dashboardService.currentOcObj.next(this.ocObj);
  }
  ngOnDestroy() {
    this.ocObj$.unsubscribe();
  }

  onCancel() {
    localStorage.removeItem('ocObj');
    this.router.navigate(['/pages/oc-list']);
  }
  onGenerateLabels() {
    this.dashboardService.currentOcObj.next(this.ocObj);
    localStorage.setItem('ocObj', JSON.stringify(this.ocObj));
    this.router.navigate(['/pages/oc-list/add-edit-labels']);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && ((charCode < 46 || charCode > 57) || charCode == 47)) {
      return false;
    }
    return true;
  }
}
@Component({
  selector: 'app-custom-renderer-srno',
  template: `<input class="font-medium-1 mr-2" name="srno" [(ngModel)]="value" (change)="onAddSrNo()">`
})
export class CustomRendererSrNoComponent implements OnInit, OnDestroy {
  ocObj = new OcModel();
  ocObj$: Subscription;

  constructor(private router: Router, private dashboardService: DashboardService,
  ) {
    this.ocObj$ = this.dashboardService.currentOcObj.subscribe(data => {
      if (data) {
        this.ocObj = new OcModel();
        this.ocObj.SerialNumbers = [];
        this.ocObj = data;
        if (!this.ocObj.SerialNumbers.length) {
          this.ocObj.SerialNumbers = [];
        }
      }
    });
  }
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  ngOnInit() {

  }

  onAddSrNo() {
    let obj = { 'ID': this.rowData.ID, 'name': this.rowData.name, 'srno': this.value };
    if (this.ocObj.SerialNumbers.length) {
      let i = this.ocObj.SerialNumbers.findIndex(v => v.ID == this.rowData.ID);
      if (i > -1) {
        this.ocObj.SerialNumbers[i] = obj;
      } else {
        this.ocObj.SerialNumbers.push(obj);
      }
    } else {
      this.ocObj.SerialNumbers = [];
      this.ocObj.SerialNumbers.push(obj);
      // console.log('this.ser', this.ocObj.SerialNumbers);
    }
    this.dashboardService.currentOcObj.next(this.ocObj);
  }
  ngOnDestroy() {
    this.ocObj$.unsubscribe();
  }

}
