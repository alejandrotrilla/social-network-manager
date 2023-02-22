package ar.com.trilla.social.core.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@AllArgsConstructor
@Getter
public class SocialNetwork {
    private UUID id;
    private String name;
    private String description;

    public SocialNetwork(SocialNetworkData data) {
        this(UUID.randomUUID(), data.name(), data.description());
    }
}
