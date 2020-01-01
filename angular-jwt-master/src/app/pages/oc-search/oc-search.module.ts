import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcSearchRoutingModule } from './oc-search-routing.module';
import { OcSearchComponent } from './oc-search.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [OcSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    OcSearchRoutingModule
  ]
})
export class OcSearchModule { }
