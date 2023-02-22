package ar.com.trilla.social.core.domain.service.response;

import ar.com.trilla.social.core.domain.model.Page;
import ar.com.trilla.social.core.domain.model.SocialNetwork;
import lombok.Value;

@Value
public class SocialNetworkPageableResponse implements DomainServiceResponse {
    private Page<SocialNetwork> socialNetworkPage;
}
