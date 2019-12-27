import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent, CustomRendererComponent } from './product.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ProductComponent, CustomRendererComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  entryComponents: [CustomRendererComponent]
})
export class ProductModule { }
