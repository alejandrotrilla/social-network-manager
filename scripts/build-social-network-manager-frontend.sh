cd social-network-manager-frontend
rm -rf dist/social-network-manager-frontend
ng build --base-href /social-network-manager-frontend/ --output-hashing=all
docker build -t alejandrotrilla/social-network-manager-frontend:$1 .
docker push alejandrotrilla/social-network-manager-frontend:$1
cd ..
