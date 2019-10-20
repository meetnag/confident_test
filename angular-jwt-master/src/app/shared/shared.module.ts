import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent } from './_components';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { QRCodeModule } from 'angularx-qrcode';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MyDatePickerModule } from 'mydatepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    QRCodeModule,
    NgSelectModule,
    DeviceDetectorModule.forRoot(),
    MyDatePickerModule,
    MatAutocompleteModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    DeviceDetectorModule,
    MyDatePickerModule,
    QRCodeModule,
    NgSelectModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MatAutocompleteModule
  ],
  providers: []
})
export class SharedModule { }
