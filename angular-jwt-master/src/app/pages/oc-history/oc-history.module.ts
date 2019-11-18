import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcHistoryRoutingModule } from './oc-history-routing.module';
import { OcHistoryComponent, CustomRendererComponent, CustomRendererViewComponent } from './oc-history.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [OcHistoryComponent,
    CustomRendererViewComponent,
    CustomRendererComponent],
  imports: [
    CommonModule,
    SharedModule,
    OcHistoryRoutingModule
  ],
  entryComponents: [
    CustomRendererViewComponent,
    CustomRendererComponent
  ]
})
export class OcHistoryModule { }
