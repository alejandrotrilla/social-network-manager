package ar.com.trilla.social.core.configuration.spring;

import ar.com.trilla.social.core.domain.model.SocialNetwork;

import java.util.UUID;

public record SocialNetworkHttpResponse(
        UUID id,
        String name,
        String description
) {
    public SocialNetworkHttpResponse(SocialNetwork socialNetwork) {
        this(socialNetwork.id(), socialNetwork.name(), socialNetwork.description());
    }
}
