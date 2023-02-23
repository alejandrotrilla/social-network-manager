import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SocialNetwork } from '../social-networks';

@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.css']
})
export class SocialNetworkComponent {
  @Input() socialNetwork? : SocialNetwork;
  @Output() newSocialNetworkEvent = new EventEmitter<SocialNetwork>();

  onSave(socialNetwork : SocialNetwork) {
    this.newSocialNetworkEvent.emit(this.socialNetwork);
  }

  onCancel() {
    this.newSocialNetworkEvent.emit(undefined);
  }
}
