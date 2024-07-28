#!/bin/sh

docker stack deploy -c base.yml -c staging.yml -c env.yml ftcawards --with-registry-auth --detach=false
