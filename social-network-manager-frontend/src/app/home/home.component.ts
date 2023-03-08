import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
        private router: Router,
        private route: ActivatedRoute,
      ) {
      }

  onSocialNetworks() {
      this.router.navigate(['social-network-list']);
  }
}
