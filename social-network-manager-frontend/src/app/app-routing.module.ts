import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SecurityGuard } from './security.guard';
import { SocialNetworkListComponent } from './social-network-list/social-network-list.component';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ProfileComponent } from './profile/profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [SecurityGuard] },
  { path: 'social-network-list', component: SocialNetworkListComponent, canActivate: [SecurityGuard] },
  { path: 'forbidden', component: ForbiddenComponent, canActivate: [SecurityGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
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
