#!/bin/bash
exit_code=0

# echo "the Container is running, check your nginx config or browse the specific port directly."
echo "Pushing the new created image"

if ! docker login gitlab.kashef.ir:5050 -u "$USERNAME" -p "$PASSWORD"
then
    echo "Could not log in to container repository with $USERNAME username"
    exit 1
fi

if ! docker push "$REPO_NAME":"$TAG"
then
    echo "Could not push into the container repository."
    exit 2
fi

#remove built container after pushing it into gitlab service
docker rmi -f "$REPO_NAME":"$TAG"

docker logout
