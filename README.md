# social-network-manager
Social Network Manager is an application for managing social networks content and events.

# Build & Deploy:
docker login -u alejandrotrilla

mvn clean install
mvn -pl social-network-manager-backend spring-boot:build-image -Dspring-boot.build-image.imageName=alejandrotrilla/social-network-manager-backend:1.0.6-SNAPSHOT
docker push alejandrotrilla/social-network-manager-backend:1.0.6-SNAPSHOT
# Local Docker execution
# docker run -p 80:80 alejandrotrilla/social-network-manager-backend:1.0.3-SNAPSHOT

cd social-network-manager-frontend
ng build --base-href /social-network-manager-frontend/ --output-hashing=all
docker build -t alejandrotrilla/social-network-manager-frontend:1.0.6-SNAPSHOT .
docker push alejandrotrilla/social-network-manager-frontend:1.0.6-SNAPSHOT
cd ..

# Local Docker execution
# docker run -p 80:80 alejandrotrilla/social-network-manager-frontend:1.0.5-SNAPSHOT



# Delete deployments: backend & frontend
# kubectl delete -f kubernetes/backend.yaml
# kubectl delete -f kubernetes/frontend.yaml
# kubectl delete -f kubernetes/keycloak.yaml

kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/keycloak.yaml
kubectl apply -f kubernetes/backend.yaml
kubectl apply -f kubernetes/frontend.yaml
kubectl apply -f kubernetes/ingress.yaml
kubectl apply -f kubernetes/letsencrypt-cluster-issuer.yaml





docker run -p 80:8080 \
-e KEYCLOAK_ADMIN=admin \
-e KEYCLOAK_ADMIN_PASSWORD=admin \
-e KC_HOSTNAME=alejandrotrilla.com.ar \
-e KC_HTTP_RELATIVE_PATH=/auth \
-e JAVA_OPTS_APPEND="-Dquarkus.http.root-path=/auth" \
quay.io/keycloak/keycloak:21.0.0 \
start-dev