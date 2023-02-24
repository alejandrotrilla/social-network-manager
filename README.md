# social-network-manager
Social Network Manager is an application for managing social networks content and events.

# Build & Deploy:
docker login -u alejandrotrilla

mvn clean install
mvn -pl social-network-manager-backend spring-boot:build-image -Dspring-boot.build-image.imageName=alejandrotrilla/social-network-manager-backend
docker push alejandrotrilla/social-network-manager-backend:latest

cd social-network-manager-frontend
ng build
docker build -t alejandrotrilla/social-network-manager-frontend .
docker push alejandrotrilla/social-network-manager-frontend:latest

kubectl apply -f kubernetes/deployment-namespace.yaml
kubectl apply -f kubernetes/deployment-backend.yaml
kubectl apply -f kubernetes/deployment-frontend.yaml
