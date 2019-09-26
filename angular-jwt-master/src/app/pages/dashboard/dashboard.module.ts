import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { DashboardComponent, CustomRendererComponent, CustomRendererViewComponent } from './dashboard.component';
import { DashboarRoutingdModule } from './dashboard-routing.module';
import { AddEditOcComponent } from './add-edit-oc/add-edit-oc.component';
import { ViewOcComponent } from './view-oc/view-oc.component';
import { UploadDocumentsComponent, CustomRendererFileComponent, CustomRendererFileDeleteComponent } from './upload-documents/upload-documents.component';
import { AddEditOcSrnoComponent, CustomRendererSrNoComponent } from './add-edit-oc-srno/add-edit-oc-srno.component';
import { AddEditOcLabelsComponent } from './add-edit-oc-labels/add-edit-oc-labels.component';
import { ScanOcComponent } from './scan-oc/scan-oc.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddEditOcComponent,
    ViewOcComponent,
    UploadDocumentsComponent,
    AddEditOcSrnoComponent,
    AddEditOcLabelsComponent,
    CustomRendererComponent,
    CustomRendererSrNoComponent,
    CustomRendererViewComponent,
    CustomRendererFileComponent,
    CustomRendererFileDeleteComponent,
    ScanOcComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboarRoutingdModule
  ],
  entryComponents: [CustomRendererComponent, CustomRendererSrNoComponent, CustomRendererViewComponent, CustomRendererFileComponent, CustomRendererFileDeleteComponent]
})
export class DashboardModule { }
