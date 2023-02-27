import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SocialNetworkListComponent } from './social-network-list/social-network-list.component';

import { SecurityGuard } from './security.guard';

const routes: Routes = [
  { path: 'social-network-list', component: SocialNetworkListComponent, canActivate: [SecurityGuard] }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
