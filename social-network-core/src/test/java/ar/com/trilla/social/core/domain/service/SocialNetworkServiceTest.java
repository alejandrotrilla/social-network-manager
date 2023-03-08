package ar.com.trilla.social.core.domain.service;

import ar.com.trilla.social.core.domain.exception.EntityNotFoundException;
import ar.com.trilla.social.core.domain.exception.InvalidRequestException;
import ar.com.trilla.social.core.domain.model.Page;
import ar.com.trilla.social.core.domain.model.SocialNetwork;
import ar.com.trilla.social.core.domain.model.SocialNetworkData;
import ar.com.trilla.social.core.domain.model.SocialNetworkGateway;
import ar.com.trilla.social.core.domain.service.request.SingleSocialNetworkDataRequest;
import ar.com.trilla.social.core.domain.service.request.SingleSocialNetworkDataWithIdRequest;
import ar.com.trilla.social.core.domain.service.request.SingleSocialNetworkIdRequest;
import ar.com.trilla.social.core.domain.service.request.SocialNetworkPageableRequest;
import ar.com.trilla.social.core.domain.service.response.SingleSocialNetworkResponse;
import ar.com.trilla.social.core.domain.service.response.SocialNetworkPageableResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SocialNetworkServiceTest {

    private static final UUID SOCIAL_NETWORK_ID = UUID.randomUUID();
    private static final String SOCIAL_NETWORK_NAME = "facebook";
    private static final String SOCIAL_NETWORK_DESCRIPTION = "Facebook Social Network";
    private static final String OTHER_SOCIAL_NETWORK_NAME = "Linkedin";
    private static final String OTHER_SOCIAL_NETWORK_DESCRIPTION = "Linkedin Social Network";
    private static final UUID NON_EXISTENT_SOCIAL_NETWORK_ID = UUID.randomUUID();
    private static final long PAGE_INDEX = 0;
    private static final long PAGE_SIZE = 10;
    private static final long SOCIAL_NETWORK_ITEMS_COUNT = 100;

    private final SocialNetwork socialNetwork = new SocialNetwork(SOCIAL_NETWORK_ID, SOCIAL_NETWORK_NAME, SOCIAL_NETWORK_DESCRIPTION);
    private final Page<SocialNetwork> socialNetworkPage = createSocialNetworkPage(PAGE_SIZE, SOCIAL_NETWORK_ITEMS_COUNT);

    @Mock
    private SocialNetworkGateway socialNetworkGateway;

    @InjectMocks
    private SocialNetworkService target;

    @Test
    void given_valid_request_when_SocialNetwork_creation_is_requested_then_return_response_with_new_SocialNetwork_instance() {
        SocialNetworkData validSocialNetworkData = new SocialNetworkData(OTHER_SOCIAL_NETWORK_NAME, OTHER_SOCIAL_NETWORK_DESCRIPTION);
        SingleSocialNetworkDataRequest validRequest = new SingleSocialNetworkDataRequest(validSocialNetworkData);
        doNothing().when(socialNetworkGateway).save(any(SocialNetwork.class));

        SingleSocialNetworkResponse response = target.create(validRequest);

        verify(socialNetworkGateway, times(1)).save(any(SocialNetwork.class));
        assertNotNull(response);
        assertNotNull(response.socialNetwork());
        assertEquals(OTHER_SOCIAL_NETWORK_NAME, response.socialNetwork().name());
        assertEquals(OTHER_SOCIAL_NETWORK_DESCRIPTION, response.socialNetwork().description());
    }

    @Test
    void given_valid_request_when_SocialNetwork_update_is_requested_then_return_response_with_updated_SocialNetwork_instance() {
        SocialNetworkData validSocialNetworkData = new SocialNetworkData(SOCIAL_NETWORK_NAME, SOCIAL_NETWORK_DESCRIPTION);
        SingleSocialNetworkDataWithIdRequest validRequest = new SingleSocialNetworkDataWithIdRequest(SOCIAL_NETWORK_ID, validSocialNetworkData);
        when(socialNetworkGateway.findById(SOCIAL_NETWORK_ID)).thenReturn(socialNetwork);
        doNothing().when(socialNetworkGateway).save(any(SocialNetwork.class));

        SingleSocialNetworkResponse response = target.update(validRequest);

        verify(socialNetworkGateway, times(1)).save(any(SocialNetwork.class));
        assertNotNull(response);
        assertNotNull(response.socialNetwork());
        assertEquals(SOCIAL_NETWORK_NAME, response.socialNetwork().name());
        assertEquals(SOCIAL_NETWORK_DESCRIPTION, response.socialNetwork().description());
    }

    @Test
    void given_null_request_when_SocialNetwork_creation_is_requested_then_throws_InvalidRequestException() {
        assertThrows(InvalidRequestException.class, () -> target.create(null));
    }

    @Test
    void given_invalid_request_when_SocialNetwork_creation_is_requested_then_throws_InvalidRequestException() {
        SingleSocialNetworkDataRequest invalidRequest = new SingleSocialNetworkDataRequest(null);

        assertThrows(InvalidRequestException.class, () -> target.create(invalidRequest));
    }

    @Test
    void given_request_with_existent_SocialNetworkId_when_SocialNetwork_deletion_is_requested_then_return_response_with_SocialNetwork_instance_deleted() {
        SingleSocialNetworkIdRequest validRequest = new SingleSocialNetworkIdRequest(SOCIAL_NETWORK_ID);
        when(socialNetworkGateway.findById(SOCIAL_NETWORK_ID)).thenReturn(socialNetwork);
        doNothing().when(socialNetworkGateway).deleteById(any(UUID.class));

        SingleSocialNetworkResponse response = target.delete(validRequest);

        verify(socialNetworkGateway, times(1)).findById(any(UUID.class));
        verify(socialNetworkGateway, times(1)).deleteById(any(UUID.class));
        assertNotNull(response);
        assertNotNull(response.socialNetwork());
        assertEquals(SOCIAL_NETWORK_NAME, response.socialNetwork().name());
        assertEquals(SOCIAL_NETWORK_DESCRIPTION, response.socialNetwork().description());
    }

    @Test
    void given_invalid_request_when_SocialNetwork_deletion_is_requested_then_throws_EntityNotFoundException() {
        when(socialNetworkGateway.findById(NON_EXISTENT_SOCIAL_NETWORK_ID)).thenReturn(null);

        SingleSocialNetworkIdRequest nonExistentSocialNetworkIdRequest = new SingleSocialNetworkIdRequest(NON_EXISTENT_SOCIAL_NETWORK_ID);

        assertThrows(EntityNotFoundException.class, () -> target.delete(nonExistentSocialNetworkIdRequest));
    }

    @Test
    void given_valid_request_when_SocialNetwork_findAllByPage_is_requested_then_return_response_with_SocialNetworkPage() {
        SocialNetworkPageableRequest validRequest = new SocialNetworkPageableRequest(PAGE_INDEX, PAGE_SIZE);
        when(socialNetworkGateway.findAllByPage(any(SocialNetworkPageableRequest.class))).thenReturn(socialNetworkPage);

        SocialNetworkPageableResponse response = target.findAllByPage(validRequest);

        verify(socialNetworkGateway, times(1)).findAllByPage(any(SocialNetworkPageableRequest.class));
        assertNotNull(response);
        assertNotNull(response.socialNetworkPage());
        assertEquals(PAGE_SIZE, response.socialNetworkPage().items().size());
        assertEquals(SOCIAL_NETWORK_ITEMS_COUNT, response.socialNetworkPage().totalItems());
    }

    private Page<SocialNetwork> createSocialNetworkPage(long pageSize, long totalItems) {
        List<SocialNetwork> items = new ArrayList<>();
        for (int i = 0; i < pageSize; ++i) {
            items.add(new SocialNetwork(UUID.randomUUID(), SOCIAL_NETWORK_NAME + i, SOCIAL_NETWORK_DESCRIPTION + i));
        }
        return new Page<>(items, totalItems);
    }
}