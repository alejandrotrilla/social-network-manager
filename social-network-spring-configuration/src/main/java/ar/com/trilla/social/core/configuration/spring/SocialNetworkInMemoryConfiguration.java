package ar.com.trilla.social.core.configuration.spring;

import ar.com.trilla.social.core.domain.model.Page;
import ar.com.trilla.social.core.domain.model.SocialNetwork;
import ar.com.trilla.social.core.domain.model.SocialNetworkGateway;
import ar.com.trilla.social.core.domain.service.SocialNetworkService;
import ar.com.trilla.social.core.domain.service.request.SocialNetworkPageableRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Configuration
public class SocialNetworkInMemoryConfiguration {
    @Bean
    public SocialNetworkGateway socialNetworkGateway() {
        return new SocialNetworkGateway() {
            private final Map<UUID, SocialNetwork> repository = new LinkedHashMap<>();

            @Override
            public void save(SocialNetwork socialNetwork) {
                repository.put(socialNetwork.id(), socialNetwork);
            }

            @Override
            public SocialNetwork findById(UUID id) {
                return repository.get(id);
            }

            @Override
            public void deleteById(UUID id) {
                repository.remove(id);
            }

            @Override
            public Page<SocialNetwork> findAllByPage(SocialNetworkPageableRequest request) {
                long totalItems = repository.size();
                return new Page<>(repository.values().stream()
                        .skip(request.pageIndex() * request.pageSize())
                        .limit(request.pageSize())
                        .toList(), totalItems);
            }
        };
    }

    @Bean
    public SocialNetworkService socialNetworkService() {
        return new SocialNetworkService(socialNetworkGateway());
    }
}
