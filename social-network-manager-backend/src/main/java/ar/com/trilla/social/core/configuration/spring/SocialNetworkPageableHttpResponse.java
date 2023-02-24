package ar.com.trilla.social.core.configuration.spring;

import java.util.List;

public record SocialNetworkPageableHttpResponse(
        List<SocialNetworkHttpResponse> items,
        long totalItems
) {
}
