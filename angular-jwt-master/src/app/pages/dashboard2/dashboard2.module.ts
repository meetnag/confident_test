import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard2RoutingModule } from './dashboard2-routing.module';
import { Dashboard2Component } from './dashboard2.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [Dashboard2Component],
  imports: [
    CommonModule,
    Dashboard2RoutingModule,
    SharedModule
  ]
})
export class Dashboard2Module { }
