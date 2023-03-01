for yamlFile in "kubernetes/social-network-manager-ingress.yaml kubernetes/social-network-keycloak.yaml kubernetes/social-network-manager-backend.yaml kubernetes/social-network-manager-frontend.yaml kubernetes/social-network-namespace.yaml kubernetes/letsencrypt-cluster-issuer.yaml";
do
  cat $yamlFile | sed 's/1.0.0-SNAPSHOT/'$1'/g' | kubectl delete -f -
done
