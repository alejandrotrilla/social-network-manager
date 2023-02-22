package ar.com.trilla.social.core;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SocialNetworkTest {

    private static final String FACEBOOK = "facebook";
    private static final String FACEBOOK_SOCIAL_NETWORK = "Facebook Social Network";

    @Test
    void given_valid_request_when_SocialNetwork_creation_is_requested_then_return_response_with_new_SocialNetwork_instance() {
        SocialNetwork target = new SocialNetwork(FACEBOOK, FACEBOOK_SOCIAL_NETWORK);

        assertNotNull(target);
        assertEquals(FACEBOOK, target.name());
        assertEquals(FACEBOOK_SOCIAL_NETWORK, target.description());
    }
}