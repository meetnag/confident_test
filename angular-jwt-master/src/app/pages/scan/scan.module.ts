import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanRoutingModule } from './scan-routing.module';
import { ScanComponent } from './scan.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ScanComponent],
  imports: [
    CommonModule,
    ScanRoutingModule,
    SharedModule
  ]
})
export class ScanModule { }
