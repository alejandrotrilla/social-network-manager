package ar.com.trilla.social.core.domain.model;

import lombok.Value;

@Value
public class SocialNetworkData implements SelfValidatable {
    private String name;
    private String description;

    @Override
    public boolean isValid() {
        return name != null && description != null;
    }
}
