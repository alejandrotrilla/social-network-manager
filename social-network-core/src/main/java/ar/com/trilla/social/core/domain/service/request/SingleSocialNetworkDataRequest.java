package ar.com.trilla.social.core.domain.service.request;

import ar.com.trilla.social.core.domain.model.SocialNetworkData;
import lombok.Value;

@Value
public class SingleSocialNetworkDataRequest implements DomainServiceRequest {
    private SocialNetworkData data;

    @Override
    public boolean isValid() {
        return data != null && data.isValid();
    }
}
