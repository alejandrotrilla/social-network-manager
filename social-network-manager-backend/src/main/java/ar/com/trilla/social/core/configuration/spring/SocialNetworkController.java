package ar.com.trilla.social.core.configuration.spring;

import ar.com.trilla.social.core.domain.model.SocialNetworkData;
import ar.com.trilla.social.core.domain.service.SocialNetworkService;
import ar.com.trilla.social.core.domain.service.request.SingleSocialNetworkDataRequest;
import ar.com.trilla.social.core.domain.service.request.SingleSocialNetworkDataWithIdRequest;
import ar.com.trilla.social.core.domain.service.request.SingleSocialNetworkIdRequest;
import ar.com.trilla.social.core.domain.service.request.SocialNetworkPageableRequest;
import ar.com.trilla.social.core.domain.service.response.SingleSocialNetworkResponse;
import ar.com.trilla.social.core.domain.service.response.SocialNetworkPageableResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/social-networks")
public class SocialNetworkController {
    @Autowired
    private SocialNetworkService socialNetworkService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public SocialNetworkHttpResponse create( @RequestBody SocialNetworkDataHttpRequest request) {
        SocialNetworkData socialNetworkData = new SocialNetworkData(request.name(), request.description());
        SingleSocialNetworkDataRequest useCaseRequest = new SingleSocialNetworkDataRequest(socialNetworkData);
        SingleSocialNetworkResponse response = socialNetworkService.create(useCaseRequest);

        return new SocialNetworkHttpResponse(response.socialNetwork());
    }

    @PutMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SocialNetworkHttpResponse update(@PathVariable UUID id, @RequestBody SocialNetworkDataHttpRequest request) {
        SocialNetworkData socialNetworkData = new SocialNetworkData(request.name(), request.description());
        SingleSocialNetworkDataWithIdRequest useCaseRequest = new SingleSocialNetworkDataWithIdRequest(id, socialNetworkData);
        SingleSocialNetworkResponse response = socialNetworkService.update(useCaseRequest);

        return new SocialNetworkHttpResponse(response.socialNetwork());
    }

    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SocialNetworkHttpResponse delete( @PathVariable UUID id) {
        SingleSocialNetworkIdRequest useCaseRequest = new SingleSocialNetworkIdRequest(id);
        SingleSocialNetworkResponse response = socialNetworkService.delete(useCaseRequest);

        return new SocialNetworkHttpResponse(response.socialNetwork());
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public SocialNetworkPageableHttpResponse findAllByPage(
            @RequestParam("pageIndex") long pageIndex,
            @RequestParam("pageSize") long pageSize) {
        SocialNetworkPageableRequest request = new SocialNetworkPageableRequest(pageIndex, pageSize);
        SocialNetworkPageableResponse response = socialNetworkService.findAllByPage(request);
        List<SocialNetworkHttpResponse> items = response.socialNetworkPage().items().stream()
                .map(SocialNetworkHttpResponse::new)
                .toList();
        long totalItems = response.socialNetworkPage().totalItems();
        return new SocialNetworkPageableHttpResponse(items, totalItems);
    }
}
