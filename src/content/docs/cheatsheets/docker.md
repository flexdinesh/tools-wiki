---
title: docker
description: Build, login, pull, push, run, list and manage containers, images, volumes, networks, system cleanup, compose, and Colima setup.
---

## Docker runtime setup

Install Docker tooling and configure local runtime behavior.

### Install Docker and Colima on macOS

Install Docker CLI and Colima as the container runtime on macOS.

```bash
$ brew install docker
$ brew install colima
$ colima start
$ brew services start colima
```

### Allow insecure registries with Colima

Configure Colima to trust a self-hosted registry that uses self-signed certificates or plain HTTP.

Create or edit `~/.docker/daemon.json`:

```json
{
  "insecure-registries": ["registry.example.com:5000"]
}
```

Then restart Colima with the custom config:

```bash
$ colima start --edit
```

Or start with a specific profile and config:

```bash
$ colima start --docker-opt "--insecure-registry=registry.example.com:5000"
```

See [Colima FAQ](https://github.com/abiosoft/colima/blob/main/docs/FAQ.md#how-to-customize-docker-config-eg-adding-insecure-registries-or-registry-mirrors) and [StackOverflow](https://stackoverflow.com/a/43482179).

## docker build

Create and tag images from Dockerfiles.

### Tag an image

Build an image from a Dockerfile and tag it.

```bash
$ docker build -t my-hello-world:latest .
[+] Building 12.3s (8/8) FINISHED
 => [internal] load build definition from Dockerfile
 => [1/4] FROM node:20-alpine
 => [2/4] COPY package*.json ./
 => [3/4] RUN npm ci
 => [4/4] COPY . .
 => exporting to image
 => => naming to docker.io/library/my-hello-world:latest
```

### Tag with multiple labels

Tag the same image with more than one label in a single build.

```bash
$ docker build -t my-hello-world:abc1234 -t my-hello-world:latest .
```

### Tag for a registry

Build and tag an image for pushing to a self-hosted or private registry. Format: `registry-url/path:tag`.

```bash
$ docker build -t registry.example.com/project/restic-rsync:latest .
```

## docker login

Authenticate with Docker Hub and private registries.

### Log in interactively

Log in to Docker Hub interactively; Docker prompts for username and password.

```bash
$ docker login
Login with your Docker ID to push and pull images from Docker Hub.
Username: moby
Password:
Login Succeeded
```

### Log in with username

Log in to Docker Hub with the username on the command line; Docker still prompts for the password.

```bash
$ docker login -u moby
Password:
Login Succeeded
```

### Log in to a private registry

Log in to a private registry instead of Docker Hub.

```bash
$ docker login registry.example.com
Username: alice
Password:
Login Succeeded
```

### Log in on a custom port

Specify the port when the registry does not listen on 443 or 80.

```bash
$ docker login registry.example.com:1337
Username: alice
Password:
Login Succeeded
```

## docker pull

Download images from registries.

### Pull an image

Download an image from a registry to the local machine.

```bash
$ docker pull nginx:latest
latest: Pulling from library/nginx
a480449de9a8: Pull complete
f3ace1b8ce45: Pull complete
11f61936cf35: Pull complete
Digest: sha256:abc123...
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest
```

## docker push

Upload tagged images to registries.

### Push an image

Push a locally tagged image to a registry.

```bash
$ docker push my-hello-world:latest
The push refers to repository [docker.io/library/my-hello-world]
abc123: Layer already exists
def456: Pushed
latest: digest: sha256:abc123... size: 2200
```

### Push all tags

Push all tags attached to an image at once.

```bash
$ docker push my-hello-world --all-tags
```

### Push to a private registry

Push an image tagged with a private registry URL.

```bash
$ docker push registry.example.com/project/restic-rsync:latest
```

## docker run

Create containers from images.

### Start a detached container

Create and start a new container from an image in detached mode with a name and port mapping.

```bash
$ docker run --name my-hello-world-container -p 3000:3000 -d my-hello-world:latest
a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234
```

### Pass environment variables

Pass environment variables into the container with `-e` flags.

```bash
$ docker run -d \
  -e REDIS_NAMESPACE='staging' \
  -e POSTGRES_ENV_POSTGRES_PASSWORD='foo' \
  -e POSTGRES_ENV_POSTGRES_USER='bar' \
  -e POSTGRES_ENV_DB_NAME='mysite_staging' \
  -e POSTGRES_PORT_5432_TCP_ADDR='docker-db-1.hidden.us-east-1.rds.amazonaws.com' \
  -e SITE_URL='staging.mysite.com' \
  -p 80:80 \
  --name container_name image_name:tag
```

### Load environment variables from a file

Use `--env-file` to load environment variables from a file instead of individual `-e` flags.

```bash
$ docker run -d --env-file .env --name my-app my-app:latest
```

### Explore an image with a shell

Run an image with an interactive shell as the entrypoint to inspect its filesystem and installed packages.

```bash
$ docker run -it --entrypoint sh restic/restic
/restic #
```

## docker ps

List containers and format container listings.

### List running containers

List running containers.

```bash
$ docker ps
CONTAINER ID   IMAGE                    COMMAND       CREATED          STATUS          PORTS                    NAMES
a1b2c3d4e5f6   my-hello-world:latest    "npm start"   10 seconds ago   Up 9 seconds    0.0.0.0:3000->3000/tcp   my-hello-world-container
```

### Format container list

Show only specific columns in a readable table format.

```bash
$ docker ps --format "table {{.ID}}\t{{.Names}}\t{{.RunningFor}}\t{{.Status}}\t{{.Ports}}"
CONTAINER ID   NAMES                      RUNNING FOR      STATUS          PORTS
a1b2c3d4e5f6   my-hello-world-container   10 seconds ago   Up 9 seconds    0.0.0.0:3000->3000/tcp
```

### List all containers

List all containers including stopped ones.

```bash
$ docker ps -a
CONTAINER ID   IMAGE                    COMMAND       CREATED        STATUS                     PORTS     NAMES
a1b2c3d4e5f6   my-hello-world:latest    "npm start"   2 minutes ago  Exited (0) 30 seconds ago             my-hello-world-container
```

### List containers on a remote host

Use the `DOCKER_HOST` environment variable to target a remote Docker daemon over SSH.

```bash
$ DOCKER_HOST="ssh://user@host" docker ps
CONTAINER ID   IMAGE          COMMAND       CREATED        STATUS        PORTS     NAMES
a1b2c3d4e5f6   nginx:latest   "/docker-e…"  2 days ago     Up 2 days     80/tcp    web
```

## docker container

Manage container lifecycle, files, logs, and metadata.

### Start a stopped container

Start an existing stopped container.

```bash
$ docker container start my-hello-world-container
my-hello-world-container
```

### Stop a container

Stop a running container gracefully.

```bash
$ docker container stop my-hello-world-container
my-hello-world-container
```

### Stop all containers

Stop every running container at once.

```bash
$ docker container stop $(docker ps -q)
a1b2c3d4e5f6
b2c3d4e5f6a7
```

### Remove a stopped container

Remove a stopped container.

```bash
$ docker container rm my-hello-world-container
my-hello-world-container
```

### Remove all containers

Remove all stopped containers at once.

```bash
$ docker container rm $(docker ps -a -q)
a1b2c3d4e5f6
b2c3d4e5f6a7
```

### Restart a container

Restart a running or stopped container.

```bash
$ docker container restart my-hello-world-container
my-hello-world-container
```

### Restart a compose-created container

Restart a single container from a Compose stack by container name.

```bash
$ docker container restart my-app-web-1
my-app-web-1
```

### Show container logs

Show the stdout/stderr logs of a container.

```bash
$ docker container logs my-hello-world-container
Server started on port 3000
Connected to Redis
```

### Filter container logs

Pipe logs through grep to find specific entries.

```bash
$ docker container logs caddy 2>&1 | grep "minio"
2026/05/03 10:00:00 minio upstream connected
```

### Open a bash shell

Run an interactive bash shell inside a running container.

```bash
$ docker container exec -it my-hello-world-container bash
root@a1b2c3d4e5f6:/app#
```

### Open a sh shell

Use `sh` when the image does not include bash, such as Alpine-based images.

```bash
$ docker container exec -it my-hello-world-container sh
/app #
```

### Open a shell in a compose-created container

Open an interactive shell in a running Compose-created container.

```bash
$ docker container exec -it my-app-web-1 bash
root@a1b2c3d4e5f6:/app#
```

### Copy files into a container

Copy a file from the host into a container.

```bash
$ docker container cp config.yml my-hello-world-container:/app/config.yml
Successfully copied 2.5kB to my-hello-world-container:/app/config.yml
```

### Copy files from a container

Copy a file from a container to the host.

```bash
$ docker container cp my-hello-world-container:/app/logs/app.log ./app.log
Successfully copied 4.1kB to ./app.log
```

### Inspect container details

Display low-level details about a container in JSON format.

```bash
$ docker container inspect my-hello-world-container
[
    {
        "Id": "a1b2c3d4e5f6...",
        "Created": "2026-05-03T10:00:00.000000000Z",
        "Path": "npm",
        "Args": ["start"],
        "State": {
            "Status": "running",
            "Running": true,
            "Pid": 12345
        },
        ...
    }
]
```

### Extract a container field

Use `--format` to extract a specific field.

```bash
$ docker container inspect --format '{{.NetworkSettings.IPAddress}}' my-hello-world-container
172.17.0.2
```

### Prune stopped containers

Remove all stopped containers.

```bash
$ docker container prune
Deleted Containers:
a1b2c3d4e5f6
b2c3d4e5f6a7
Total reclaimed space: 2.3MB
```

## docker image

List, remove, and prune local images.

### List local images

List all locally available images.

```bash
$ docker image ls
REPOSITORY       TAG       IMAGE ID       CREATED         SIZE
my-hello-world   latest    abc123def456   2 minutes ago   120MB
nginx            latest    789ghi012jkl   3 days ago      187MB
```

### Remove an image

Remove a local image by name or ID.

```bash
$ docker image rm my-hello-world:latest
Untagged: my-hello-world:latest
Deleted: sha256:abc123def456...
```

### Prune dangling images

Remove dangling images: images not tagged and not referenced by any container.

```bash
$ docker image prune
Deleted Images:
untagged: hello-world@sha256:abc123...
deleted: sha256:def456...
Total reclaimed space: 1.2MB
```

### Prune unused images

Remove all images not associated with at least one container.

```bash
$ docker image prune -a
Deleted Images:
untagged: nginx:latest
deleted: sha256:789ghi012jkl...
Total reclaimed space: 45.8MB
```

## docker volume

List and prune Docker volumes.

### List volumes

List all Docker volumes.

```bash
$ docker volume ls
DRIVER    VOLUME NAME
local     my-app-data
local     postgres-data
```

### Prune unused volumes

Remove volumes not used by at least one container.

```bash
$ docker volume prune
Deleted Volumes:
my-app-data
Total reclaimed space: 50.2MB
```

## docker network

List and prune Docker networks.

### List networks

List all Docker networks.

```bash
$ docker network ls
NETWORK ID     NAME              DRIVER    SCOPE
a1b2c3d4e5f6   bridge            bridge    local
b2c3d4e5f6a7   host              host      local
c3d4e5f6a7b8   my-app-network    bridge    local
```

### Prune unused networks

Remove networks not used by any container.

```bash
$ docker network prune
Deleted Networks:
my-app-network
Total reclaimed space: 0B
```

## docker system

Remove unused Docker resources.

### Prune unused resources

Remove all unused images, containers, and networks.

```bash
$ docker system prune
Deleted Containers:
...
Deleted Networks:
...
Deleted Images:
...
Total reclaimed space: 120.5MB
```

### Prune resources and volumes

Remove all unused images, containers, networks, and volumes.

```bash
$ docker system prune -a --volumes
Deleted Containers:
...
Deleted Volumes:
...
Deleted Networks:
...
Deleted Images:
...
Total reclaimed space: 350.2MB
```

## docker compose

Manage multi-container services with Compose.

### Start services

Start all services defined in a compose file.

```bash
$ docker compose -f compose.yml up
[+] Running 3/3
 ✔ Network my-app_default  Created
 ✔ Container my-app-web-1  Started
 ✔ Container my-app-db-1   Started
```

### Start services detached

Start services in the background.

```bash
$ docker compose -f compose.yml up -d
[+] Running 3/3
 ✔ Network my-app_default  Created
 ✔ Container my-app-web-1  Started
 ✔ Container my-app-db-1   Started
```

### Force recreate services

Force recreate containers even if their configuration has not changed.

```bash
$ docker compose -f compose.yml up -d --force-recreate
[+] Running 2/2
 ✔ Container my-app-web-1  Recreated
 ✔ Container my-app-db-1   Recreated
```

### Stop services

Stop and remove containers and networks defined in a compose file.

```bash
$ docker compose -f compose.yml down
[+] Running 3/3
 ✔ Container my-app-web-1  Removed
 ✔ Container my-app-db-1   Removed
 ✔ Network my-app_default  Removed
```

### Stop and clean up

Stop and remove containers, networks, images, orphans, and volumes.

```bash
$ docker compose -f compose.yml down --rmi --remove-orphans -v
[+] Running 5/5
 ✔ Container my-app-web-1   Removed
 ✔ Container my-app-db-1    Removed
 ✔ Volume my-app_db-data    Removed
 ✔ Image my-app-web         Removed
 ✔ Network my-app_default   Removed
```

### Show service logs

Show logs from all services or a specific container.

```bash
$ docker compose -f compose.yml logs web
my-app-web-1  | Server started on port 3000
my-app-web-1  | Connected to database
```

---

## Popular use cases

Use Docker with filters, pipes, and JSON tools to inspect and manage local services.

### Find containers by image or name

Format the container list, then filter it with `grep`.

```bash
$ docker ps --format '{{.ID}}\t{{.Image}}\t{{.Names}}' | grep postgres
6d1f2a3b4c5d	postgres:16	db
```

### Follow logs and filter errors

Stream logs from a Compose service and keep only error lines.

```bash
$ docker compose logs -f api | grep -i error
api-1  | ERROR database connection failed
api-1  | ERROR retry limit reached
```

### Inspect container state with jq

Pipe Docker's JSON output into `jq` to extract one field.

```bash
$ docker inspect web | jq -r '.[0].State.Status'
running
```

### Stop matching containers

Print matching container IDs and pass them to `docker stop`.

```bash
$ docker ps --filter name=api --format '{{.ID}}' | xargs docker stop
c7a8d9e0f1a2
```

### Remove dangling images

List dangling image IDs and remove them in one pipeline.

```bash
$ docker images -f dangling=true -q | xargs docker rmi
Deleted: sha256:abc123...
```
