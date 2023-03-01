import { Component } from '@angular/core';

import { OidcSecurityService } from 'angular-auth-oidc-client';

import { SocialNetwork } from '../social-networks';
import { SocialNetworkService } from '../social-network.service';

@Component({
  selector: 'app-social-network-list',
  templateUrl: './social-network-list.component.html',
  styleUrls: ['./social-network-list.component.css']
})
export class SocialNetworkListComponent {
  private accessToken : string = '';
  selectedSocialNetwork?: SocialNetwork;

  socialNetworkItems : SocialNetwork[] = [];
  socialNetworkCount : number = 0;
  pageIndex : number = 0;
  pageSize : number = 10;
  lastPageIndex : number = 0;
  editing : boolean = false;

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  constructor(
    private socialNetworkService : SocialNetworkService,
    private oidcSecurityService: OidcSecurityService
    ) {
  }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ accessToken }) => {
      this.accessToken = accessToken;
      this.getSocialNetworks(accessToken);
    });
  }


  onSelect(socialNetwork: SocialNetwork): void {
    this.selectedSocialNetwork = socialNetwork;
  }

  onRefresh() : void {
    this.getSocialNetworks(this.accessToken);
    this.selectedSocialNetwork = undefined;
    this.editing = false;
  }

  getSocialNetworks(accessToken : string) : void {
    this.socialNetworkService.getSocialNetworks(this.pageIndex, this.pageSize, accessToken)
      .subscribe(socialNetworks => {
        this.socialNetworkItems = socialNetworks.items;
        this.socialNetworkCount = socialNetworks.totalItems;
        this.lastPageIndex = Math.ceil(this.socialNetworkCount / this.pageSize) - 1;
      });
  }

  onFirstPage() {
    this.pageIndex = 0;
    this.onRefresh();
  }

  onPreviousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex = this.pageIndex - 1;
      this.onRefresh();
    }
  }

  onNextPage() {
    if (this.pageIndex < this.lastPageIndex) {
      this.pageIndex = this.pageIndex + 1;
      this.onRefresh();
    }
  }

  onLastPage() {
    this.pageIndex = this.lastPageIndex;
    this.onRefresh();
  }

  onChangePageSize() {
    this.pageIndex = 0;
    this.onRefresh();
  }

  onNewItem() {
    this.selectedSocialNetwork = {};
    this.editing = true;
  }

  onSave(socialNetwork : SocialNetwork) {
    if (socialNetwork !== undefined) {
      this.createSocialNetwork(socialNetwork);
    }
    this.editing = false;
    this.selectedSocialNetwork = undefined;
  }

  createSocialNetwork(socialNetwork : SocialNetwork) {
    this.socialNetworkService.createSocialNetwork(socialNetwork, this.accessToken)
      .subscribe(response => this.onRefresh());
  }

  onDelete(socialNetwork : SocialNetwork) {
    this.socialNetworkService.deleteSocialNetwork(socialNetwork.id || '', this.accessToken)
      .subscribe(response => this.onRefresh());
  }

}
