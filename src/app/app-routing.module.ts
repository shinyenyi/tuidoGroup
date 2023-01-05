import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommingSoonPageComponent } from './comming-soon-page/comming-soon-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'commingSoon', pathMatch: 'full'
  },
  {
    path: 'commingSoon',
    component: CommingSoonPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
