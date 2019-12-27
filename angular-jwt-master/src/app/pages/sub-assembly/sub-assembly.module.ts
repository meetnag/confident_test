import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubAssemblyRoutingModule } from './sub-assembly-routing.module';
import { SubAssemblyComponent } from './sub-assembly.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SubAssemblyComponent],
  imports: [
    CommonModule,
    SubAssemblyRoutingModule,
    SharedModule
  ]
})
export class SubAssemblyModule { }
