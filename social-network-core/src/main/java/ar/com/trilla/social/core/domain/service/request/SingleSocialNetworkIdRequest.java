package ar.com.trilla.social.core.domain.service.request;

import lombok.Value;

import java.util.UUID;

@Value
public class SingleSocialNetworkIdRequest implements DomainServiceRequest {
    private UUID id;

    @Override
    public boolean isValid() {
        return id != null;
    }
}
