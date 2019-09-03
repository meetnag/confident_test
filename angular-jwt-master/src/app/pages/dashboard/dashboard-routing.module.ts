import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddEditOcComponent } from './add-edit-oc/add-edit-oc.component';
import { AddEditOcSrnoComponent } from './add-edit-oc-srno/add-edit-oc-srno.component';
import { AddEditOcLabelsComponent } from './add-edit-oc-labels/add-edit-oc-labels.component';
import { ViewOcComponent } from './view-oc/view-oc.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'add-oc',
    component: AddEditOcComponent
  },
  {
    path: 'edit-oc/:id',
    component: AddEditOcComponent
  },
  {
    path: 'add-edit-srno',
    component: AddEditOcSrnoComponent
  },
  {
    path: 'add-edit-labels',
    component: AddEditOcLabelsComponent
  },
  {
    path: 'view-oc/:id',
    component: ViewOcComponent
  },
  {
    path: 'upload/:id',
    component: UploadDocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DashboarRoutingdModule { }
