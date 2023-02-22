package ar.com.trilla.social.core.domain.service.request;

import lombok.Value;

@Value
public class SocialNetworkPageableRequest implements DomainServiceRequest {
    private long pageIndex;
    private long pageSize;

    @Override
    public boolean isValid() {
        return pageIndex >= 0 && pageSize > 0;
    }
}
