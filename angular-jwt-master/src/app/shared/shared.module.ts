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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ModalModule } from 'ngx-bootstrap';
import { ConfirmationAlertComponent } from './_components/confirmation-alert/confirmation-alert.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ConfirmationAlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    QRCodeModule,
    NgSelectModule,
    ModalModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    MyDatePickerModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDialogModule
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
    MatAutocompleteModule,
    ModalModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [ConfirmationAlertComponent]
})
export class SharedModule { }
