package ar.com.trilla.social.core.domain.model;

import lombok.Value;

import java.util.List;

@Value
public class Page<T> {
    private List<T> items;
    private long totalItems;
}
