package ar.com.trilla.social.core.domain.model;

import ar.com.trilla.social.core.domain.service.request.SocialNetworkPageableRequest;

import java.util.UUID;

public interface SocialNetworkGateway {
    void save(SocialNetwork socialNetwork);

    SocialNetwork findById(UUID id);

    void deleteById(UUID id);

    Page<SocialNetwork> findAllByPage(SocialNetworkPageableRequest request);
}
