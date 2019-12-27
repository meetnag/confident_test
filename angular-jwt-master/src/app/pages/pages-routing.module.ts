import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'oc-list',
      loadChildren: './dashboard/dashboard.module#DashboardModule',
    },
    {
      path: 'oc-history',
      loadChildren: './oc-history/oc-history.module#OcHistoryModule',
    },
    {
      path: 'oc-upload',
      loadChildren: './oc-upload/oc-upload.module#OcUploadModule',
    },
    {
      path: 'dashboard',
      loadChildren: './dashboard2/dashboard2.module#Dashboard2Module',
    },
    {
      path: 'product',
      loadChildren: './product/product.module#ProductModule',
    },
    {
      path: 'spare',
      loadChildren: './spare/spare.module#SpareModule',
    },
    {
      path: 'sub-assembly',
      loadChildren: './sub-assembly/sub-assembly.module#SubAssemblyModule',
    },
    {
      path: '',
      redirectTo: 'oc-list',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
