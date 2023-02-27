docker run --name keycloak -p 8081:8080 \
-e KEYCLOAK_ADMIN=admin \
-e KEYCLOAK_ADMIN_PASSWORD=admin \
-e KC_HOSTNAME=localhost \
-e KC_HTTP_RELATIVE_PATH=/auth \
-e JAVA_OPTS_APPEND="-Dquarkus.http.root-path=/auth" \
quay.io/keycloak/keycloak:23.0.0 \
start-dev
