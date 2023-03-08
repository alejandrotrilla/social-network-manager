package ar.com.trilla.social.core.domain.service.request;

import ar.com.trilla.social.core.domain.model.SocialNetworkData;
import lombok.Value;

import java.util.UUID;

@Value
public class SingleSocialNetworkDataWithIdRequest implements DomainServiceRequest {
    private UUID id;
    private SocialNetworkData data;

    @Override
    public boolean isValid() {
        return id != null && data != null && data.isValid();
    }
}
