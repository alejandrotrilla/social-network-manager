yamlFile="kubernetes/social-network-manager-frontend.yaml"

cat $yamlFile | sed 's/1.0.0-SNAPSHOT/'$1'/g' | kubectl delete -f -
cat $yamlFile | sed 's/1.0.0-SNAPSHOT/'$2'/g' | kubectl apply -f -