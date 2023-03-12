package ar.com.trilla.social.core.configuration.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authz ->
                        authz
                                .requestMatchers("/health").permitAll()
                                .requestMatchers("/social-networks/**").hasAuthority("SCOPE_admin")
                )
                .oauth2ResourceServer(oauth2 -> oauth2.jwt());
        return http.build();
    }
}