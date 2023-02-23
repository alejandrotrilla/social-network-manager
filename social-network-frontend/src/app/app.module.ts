import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SocialNetworkComponent } from './social-network/social-network.component';
import { SocialNetworkListComponent } from './social-network-list/social-network-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SocialNetworkComponent,
    SocialNetworkListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
