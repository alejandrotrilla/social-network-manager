package ar.com.trilla.social.core.configuration.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SocialNetworkManagerBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(SocialNetworkManagerBackendApplication.class, args);
    }
}
