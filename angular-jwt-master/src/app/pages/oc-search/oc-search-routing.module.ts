import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OcSearchComponent } from './oc-search.component';

const routes: Routes = [
  {
    path: '',
    component: OcSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcSearchRoutingModule { }
