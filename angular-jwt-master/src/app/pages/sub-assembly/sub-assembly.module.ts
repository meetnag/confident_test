import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubAssemblyRoutingModule } from './sub-assembly-routing.module';
import { SubAssemblyComponent, CustomRendererComponent } from './sub-assembly.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SubAssemblyComponent, CustomRendererComponent],
  imports: [
    CommonModule,
    SubAssemblyRoutingModule,
    SharedModule
  ],
  entryComponents: [CustomRendererComponent]
})
export class SubAssemblyModule { }
