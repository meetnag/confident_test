import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubAssemblyComponent } from './sub-assembly.component';

const routes: Routes = [
  {
    path: '',
    component: SubAssemblyComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubAssemblyRoutingModule { }
