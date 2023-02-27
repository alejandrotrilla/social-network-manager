FROM nginx:1.23.3
RUN mkdir /usr/share/nginx/html/social-network-manager-frontend
COPY dist/social-network-manager-frontend/* /usr/share/nginx/html/social-network-manager-frontend
COPY default.conf /etc/nginx/conf.d
EXPOSE 80
