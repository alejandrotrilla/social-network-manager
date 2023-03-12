package ar.com.trilla.social.core.configuration.spring;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/health")
public class HealthCheckController {
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public String check() {
        return "Healthy: %s".formatted(LocalDateTime.now());
    }
}
