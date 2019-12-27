import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpareRoutingModule } from './spare-routing.module';
import { SpareComponent } from './spare.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SpareComponent],
  imports: [
    CommonModule,
    SpareRoutingModule,
    SharedModule
  ]
})
export class SpareModule { }
