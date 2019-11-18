import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OcHistoryComponent } from './oc-history.component';

const routes: Routes = [{
  path: '',
  component: OcHistoryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcHistoryRoutingModule { }
