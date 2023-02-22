package ar.com.trilla.social.core.domain.service.response;

import ar.com.trilla.social.core.domain.model.SocialNetwork;
import lombok.Value;

@Value
public class SingleSocialNetworkResponse implements DomainServiceResponse {
    private SocialNetwork socialNetwork;
}
