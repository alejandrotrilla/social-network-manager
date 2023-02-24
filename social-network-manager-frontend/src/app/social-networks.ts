export interface SocialNetwork {
  id?: string;
  name?: string;
  description?: string;
}

export interface SocialNetworkPage {
  items: SocialNetwork[];
  totalItems: number;
}

export const EMPTY_SOCIAL_NETWORK_PAGE : SocialNetworkPage = {
  items : [],
  totalItems : 0
};

export const SOCIAL_NETWORKS : SocialNetwork[] = [
                                                   {
                                                     id: 'df4b040c-8228-462c-9bb0-1987bb2edcca',
                                                     name: 'Facebook',
                                                     description: 'Facebook Social Network'
                                                   },
                                                   {
                                                     id: 'ab1b240c-8333-462c-9bb0-1987bb2edcbc',
                                                     name: 'Linkedin',
                                                     description: 'Linkedin Social Network'
                                                   },
                                                   {
                                                     id: 'ab1b240c-8333-462c-9bb0-1987bb2edcaa',
                                                     name: 'Instagram',
                                                     description: 'Instagram Social Network'
                                                   }
                                                 ];
