# Create docker file
gedit DockerFile

## Images 
# Build docker image
docker build -t name-of-image .
# Remove image by Image Id
docker rmi 73e8a4cf7fa8
# Remove all images
docker rmi -f $(docker images -aq)

## Containers
# List all containers
docker container ls
# Remove container by it's Id
docker rm <id-cont>
# Stop all containers
docker kill $(docker ps -q)
# Delete all containers that are not running
docker container rm $(docker ps -a -q)