# social-network-manager
Social Network Manager is an application for managing social networks content and events.

# Build & Deploy:
```
docker login -u alejandrotrilla
. scripts/build-social-network-manager-backend.sh 1.0.0-SNAPSHOT
. scripts/build-social-network-manager-frontend.sh 1.0.0-SNAPSHOT
. scripts/deploy-all-to-kubernetes.sh 1.0.0-SNAPSHOT
```

# For undeploy from kubernetes
```
. scripts/delete-all-from-kubernetes.sh 1.0.0-SNAPSHOT
```

# For Local execution & testing
```
. scripts/local-docker/run-docker-keycloak.sh
. scripts/local-docker/run-docker-social-network-manager-backend.sh 1.0.0-SNAPSHOT
. scripts/local-docker/run-docker-social-network-manager-frontend.sh 1.0.0-SNAPSHOT
```

# For upgrade a version in the cloud
```
. scripts/build-social-network-manager-backend.sh 1.0.1-SNAPSHOT
. scripts/upgrade-social-network-manager-backend-and-deploy-to-kubernetes.sh 1.0.0-SNAPSHOT 1.0.1-SNAPSHOT 
. scripts/build-social-network-manager-frontend.sh 1.0.1-SNAPSHOT
. scripts/upgrade-social-network-manager-frontend-and-deploy-to-kubernetes.sh 1.0.6-SNAPSHOT 1.0.1-SNAPSHOT 
```
