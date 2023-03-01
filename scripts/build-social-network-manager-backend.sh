mvn clean install
mvn -pl social-network-manager-backend spring-boot:build-image -Dspring-boot.build-image.imageName=alejandrotrilla/social-network-manager-backend:$1
docker push alejandrotrilla/social-network-manager-backend:$1
