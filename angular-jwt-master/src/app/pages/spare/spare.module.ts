import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpareRoutingModule } from './spare-routing.module';
import { SpareComponent, CustomRendererComponent } from './spare.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SpareComponent, CustomRendererComponent],
  imports: [
    CommonModule,
    SpareRoutingModule,
    SharedModule
  ],
  entryComponents: [CustomRendererComponent]
})
export class SpareModule { }
