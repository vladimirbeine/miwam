import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpotlightPage } from './spotlight.page';

const routes: Routes = [
  {
    path: '',
    component: SpotlightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpotlightPageRoutingModule {}
