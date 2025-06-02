#!/bin/bash
set -x
project_name="sata_project"

#Be syncornized with sata-backend project, the nginx part of compose file.
# service_name="sata_nginx"
# container_name="sata_nginx"

if [ "$REBUILD" == 'true' ]
then
    docker system prune --force
    OPTIONS="--no-cache --rm --pull"
else
    OPTIONS="--rm --pull"
fi

#Setting the base url based on TEST argument
sed -i "s|\"baseUrl\":[[:space:]].*|\"baseUrl\": \"${BASE_URL_DEV}\"|g" src/config/default.json

echo "Creating new container image with $OPTIONS argument."
DOCKER_BUILDKIT=1 docker image build $OPTIONS --tag "$REPO_NAME":"$TAG" .

#Removing dangling docker images...
docker image prune -f
