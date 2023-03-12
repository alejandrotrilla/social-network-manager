docker run --name consul \
-p 8500:8500 \
-e CONSUL_BIND_INTERFACE=eth0 \
consul:1.15.1
