curl --location --request PUT 'http://localhost:8500/v1/kv/config/social-network-manager-backend/jwtIssuerUri' \
--header 'Content-Type: text/plain' \
--data-raw 'http://localhost:4200/auth/realms/social-network'