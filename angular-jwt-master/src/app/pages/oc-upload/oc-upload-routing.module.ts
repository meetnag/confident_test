import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OcUploadComponent } from './oc-upload.component';

const routes: Routes = [{
  path: '',
  component: OcUploadComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcUploadRoutingModule { }
