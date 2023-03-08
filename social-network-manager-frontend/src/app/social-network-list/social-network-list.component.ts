import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { OidcSecurityService } from 'angular-auth-oidc-client';

import { SocialNetwork } from '../social-networks';
import { SocialNetworkService } from '../social-network.service';

const FIRST_PAGE_INDEX : number = 1;

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
  pageIndex : number = FIRST_PAGE_INDEX;
  pageSize : number = 10;
  lastPageIndex : number = 0;
  editing : boolean = false;
  pageSizeControl = new FormControl('10');

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

  onRefresh() : void {
    this.getSocialNetworks(this.accessToken);
    this.selectedSocialNetwork = undefined;
    this.editing = false;
  }

  getSocialNetworks(accessToken : string) : void {
    this.socialNetworkService.getSocialNetworks(this.pageIndex - 1, this.pageSize, accessToken)
      .subscribe(socialNetworks => {
        this.socialNetworkItems = socialNetworks.items;
        this.socialNetworkCount = socialNetworks.totalItems;
        this.lastPageIndex = Math.max(Math.ceil(this.socialNetworkCount / this.pageSize), FIRST_PAGE_INDEX);
      });
  }

  onFirstPage() {
    this.pageIndex = FIRST_PAGE_INDEX;
    this.onRefresh();
  }

  onPreviousPage() {
    if (this.pageIndex > FIRST_PAGE_INDEX) {
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
    this.pageIndex = FIRST_PAGE_INDEX;
    this.pageSize = Number(this.pageSizeControl.value || '10');
    this.onRefresh();
  }

  onSelectItem(socialNetwork: SocialNetwork): void {
    this.selectedSocialNetwork = socialNetwork;
    this.editing = true;
  }

  onNewItem() {
    this.selectedSocialNetwork = {};
    this.editing = false;
  }

  onSave(socialNetwork : SocialNetwork) {
    if (socialNetwork !== undefined) {
      if (this.editing) {
        this.updateSocialNetwork(socialNetwork);
      } else {
        this.createSocialNetwork(socialNetwork);
      }
    }
    this.editing = false;
    this.selectedSocialNetwork = undefined;
  }

  createSocialNetwork(socialNetwork : SocialNetwork) {
    this.socialNetworkService.createSocialNetwork(socialNetwork, this.accessToken)
      .subscribe(response => this.onRefresh());
  }

  updateSocialNetwork(socialNetwork : SocialNetwork) {
    this.socialNetworkService.updateSocialNetwork(socialNetwork, this.accessToken)
      .subscribe(response => this.onRefresh());
  }

  onDelete(socialNetwork : SocialNetwork) {
    this.socialNetworkService.deleteSocialNetwork(socialNetwork.id || '', this.accessToken)
      .subscribe(response => this.onRefresh());
  }
}
