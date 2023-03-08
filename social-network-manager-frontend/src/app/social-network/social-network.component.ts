import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SocialNetwork } from '../social-networks';

@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.css']
})
export class SocialNetworkComponent implements OnInit {
  @Input() socialNetwork! : SocialNetwork;
  @Output() newSocialNetworkEvent = new EventEmitter<SocialNetwork>();
  @Input() editing! : boolean;

  socialNetworkForm = new FormGroup({
    id : new FormControl({ value: '', disabled: true}, Validators.required),
    name : new FormControl({ value: '', disabled: false}, Validators.required),
    description : new FormControl({ value: '', disabled: false}, Validators.required),
  });

  ngOnInit() {
    this.socialNetworkForm.patchValue(this.socialNetwork);
    this.editing = this.socialNetwork.id != null;
  }

  onSave(socialNetwork : SocialNetwork) {
    this.newSocialNetworkEvent.emit(Object(this.socialNetworkForm.getRawValue()));
  }

  onCancel() {
    this.newSocialNetworkEvent.emit(undefined);
  }
}
