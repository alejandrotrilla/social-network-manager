for yamlFile in "kubernetes/letsencrypt-cluster-issuer.yaml" "kubernetes/namespace.yaml" "kubernetes/keycloak.yaml" "kubernetes/social-network-manager-backend.yaml" "kubernetes/social-network-manager-frontend.yaml" "kubernetes/social-network-manager-ingress.yaml";
do
  cat $yamlFile | sed 's/1.0.0-SNAPSHOT/'$1'/g' | kubectl apply -f -
done
