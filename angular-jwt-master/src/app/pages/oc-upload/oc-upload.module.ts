import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcUploadRoutingModule } from './oc-upload-routing.module';
import { OcUploadComponent } from './oc-upload.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [OcUploadComponent],
  imports: [
    CommonModule,
    SharedModule,
    OcUploadRoutingModule
  ]
})
export class OcUploadModule { }
