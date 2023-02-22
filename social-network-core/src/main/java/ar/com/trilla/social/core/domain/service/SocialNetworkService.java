package ar.com.trilla.social.core.domain.service;

import ar.com.trilla.social.core.domain.exception.EntityNotFoundException;
import ar.com.trilla.social.core.domain.exception.InvalidRequestException;
import ar.com.trilla.social.core.domain.model.Page;
import ar.com.trilla.social.core.domain.model.SocialNetwork;
import ar.com.trilla.social.core.domain.model.SocialNetworkGateway;
import ar.com.trilla.social.core.domain.service.request.DomainServiceRequest;
import ar.com.trilla.social.core.domain.service.request.SingleSocialNetworkDataRequest;
import ar.com.trilla.social.core.domain.service.request.SingleSocialNetworkIdRequest;
import ar.com.trilla.social.core.domain.service.request.SocialNetworkPageableRequest;
import ar.com.trilla.social.core.domain.service.response.SingleSocialNetworkResponse;
import ar.com.trilla.social.core.domain.service.response.SocialNetworkPageableResponse;

public class SocialNetworkService  {
    private final SocialNetworkGateway socialNetworkGateway;

    public SocialNetworkService(SocialNetworkGateway socialNetworkGateway) {
        this.socialNetworkGateway = socialNetworkGateway;
    }

    public SingleSocialNetworkResponse create(SingleSocialNetworkDataRequest request) {
        validateRequest(request, "Invalid Request : %s".formatted(request));
        SocialNetwork socialNetwork = new SocialNetwork(request.data());
        socialNetworkGateway.save(socialNetwork);
        return new SingleSocialNetworkResponse(socialNetwork);
    }

    public SingleSocialNetworkResponse delete(SingleSocialNetworkIdRequest request) {
        validateRequest(request, "Invalid Request : %s".formatted(request));
        SocialNetwork socialNetwork = socialNetworkGateway.findById(request.id());
        checkExistence(socialNetwork, "Social Network with id=%s not found in repository".formatted(request.id()));
        socialNetworkGateway.deleteById(request.id());
        return new SingleSocialNetworkResponse(socialNetwork);
    }

    public SocialNetworkPageableResponse findAllByPage(SocialNetworkPageableRequest request) {
        validateRequest(request, "Invalid Request : %s".formatted(request));
        Page<SocialNetwork> socialNetworkPage = socialNetworkGateway.findAllByPage(request);
        return new SocialNetworkPageableResponse(socialNetworkPage);
    }

    private void validateRequest(DomainServiceRequest request, String errorMessage) {
        if (request == null || !request.isValid()) {
            throw new InvalidRequestException(errorMessage);
        }
    }

    private void checkExistence(SocialNetwork network, String errorMessage) {
        if (network == null) {
            throw new EntityNotFoundException(errorMessage);
        }
    }
}
