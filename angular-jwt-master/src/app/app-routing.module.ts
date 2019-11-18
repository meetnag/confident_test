import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/_guards';

const routes: Routes = [
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule', canActivate: [AuthGuard] },
  // canActivate: [AuthGuard]
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'scan/:id',
    loadChildren: './pages/scan/scan.module#ScanModule',
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
