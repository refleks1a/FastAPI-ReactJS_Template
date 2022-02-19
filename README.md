# ToDo-FastApi-ReactJS

Simple ToDo application.

Stack :
- FastAPI
- ReactJS
- BootStrap
- SQLite
- MailHog


## Getting started

1. Copy .env.exemple to .env. Configure .env if needed.
2. Run all application by using the file "start-docker-linux.sh"

Once launched, there will be available hosts:
- http://localhost:8081/ - FrontEnd application
- http://localhost:8083/docs - BackEnd Swagger documentions
- http://localhost:8085/ - MailHog to view mails sent by application

## About project

Backend use FastAPI and running on Uvicorn server. Data Base is SQLite. The first time launched, the application creates tables and fills them with data (Test user and test user's Todos).

There is a fake smtp server (MailHog) to intercept and view sent mails.

FrontEnd made using ReactJS fonctional components with hooks. Styles and comoponents are BootStrap ReactJS components.

Servers are running inside docker containers. Docker-compose is used to manage them.

Docker volumes are binded with developer workstations for direct code modifications. Hot reload are supported for todo-api and todo-frontend.

## Useful commands

# Build (or rebuild) the containers and launch all services
docker-compose up --build --force-recreate

# stop all services
docker-compose down

# Launch a new instance of the docker-compose service using docker-compose (starting a new container and running /bin/sh inside)
# this is useful for container debugging
docker-compose run todo-api /bin/sh

# Execute a command inside a running container for service todo-my-service :
# (here are a running a /bin/sh inside todo-api container)
docker-compose exec todo-api /bin/sh

# Read a file from a container (to list all docker containers run docker ps -a)
docker container cp dadd0a5984de5c7f1dac6300a284decf3cad897180c370b8ecab647d3202fd43:/app/package.json -

# Run tests inside todo-api container
docker-compose exec todo-api python -m pytest tests/

# Run shell inside FastAPI container:
docker-compose exec todo-api /bin/sh

# Restart docker container in command line (in this exemple worker is todo-api)
docker-compose restart todo-api