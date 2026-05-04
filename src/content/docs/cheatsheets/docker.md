---
title: docker
description: Install, build, registry, run, manage containers and images, cleanup, compose, and remote host.
---

## Install

### Install Docker and Colima on macOS

Install Docker CLI and Colima as the container runtime on macOS.

```bash
$ brew install docker
$ brew install colima
$ colima start
$ brew services start colima
```

---

## Build

### docker build -t

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

### Build with multiple tags

Tag the same image with more than one label in a single build.

```bash
$ docker build -t my-hello-world:abc1234 -t my-hello-world:latest .
```

### Build tag for a registry

Build and tag an image for pushing to a self-hosted or private registry. Format: `registry-url/path:tag`.

```bash
$ docker build -t registry.example.com/project/restic-rsync:latest .
```

---

## Registry

### docker login

Log in to Docker Hub interactively (prompts for username and password).

```bash
$ docker login
Login with your Docker ID to push and pull images from Docker Hub.
Username: moby
Password:
Login Succeeded
```

### docker login with username

Log in to Docker Hub with the username on the command line (still prompts for password).

```bash
$ docker login -u moby
Password:
Login Succeeded
```

### docker login to a self-hosted registry

Log in to a private registry instead of Docker Hub.

```bash
$ docker login registry.example.com
Username: alice
Password:
Login Succeeded
```

### docker login on a custom port

Specify the port when the registry does not listen on 443 or 80.

```bash
$ docker login registry.example.com:1337
Username: alice
Password:
Login Succeeded
```

### docker pull

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

### docker push

Push a locally tagged image to a registry.

```bash
$ docker push my-hello-world:latest
The push refers to repository [docker.io/library/my-hello-world]
abc123: Layer already exists
def456: Pushed
latest: digest: sha256:abc123... size: 2200
```

### docker push --all-tags

Push all tags attached to an image at once.

```bash
$ docker push my-hello-world --all-tags
```

### Push to a self-hosted registry

Push an image tagged with a private registry URL.

```bash
$ docker push registry.example.com/project/restic-rsync:latest
```

---

## Run

### docker run

Create and start a new container from an image in detached mode with a name and port mapping.

```bash
$ docker run --name my-hello-world-container -p 3000:3000 -d my-hello-world:latest
a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234
```

### docker run with environment variables

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

### docker run with multiple env vars from a file

Use `--env-file` to load environment variables from a file instead of individual `-e` flags.

```bash
$ docker run -d --env-file .env --name my-app my-app:latest
```

---

## Containers

### docker ps

List running containers.

```bash
$ docker ps
CONTAINER ID   IMAGE                    COMMAND       CREATED          STATUS          PORTS                    NAMES
a1b2c3d4e5f6   my-hello-world:latest    "npm start"   10 seconds ago   Up 9 seconds    0.0.0.0:3000->3000/tcp   my-hello-world-container
```

### docker ps with custom format

Show only specific columns in a readable table format.

```bash
$ docker ps --format "table {{.ID}}\t{{.Names}}\t{{.RunningFor}}\t{{.Status}}\t{{.Ports}}"
CONTAINER ID   NAMES                      RUNNING FOR      STATUS          PORTS
a1b2c3d4e5f6   my-hello-world-container   10 seconds ago   Up 9 seconds    0.0.0.0:3000->3000/tcp
```

### docker ps -a

List all containers including stopped ones.

```bash
$ docker ps -a
CONTAINER ID   IMAGE                    COMMAND       CREATED        STATUS                     PORTS     NAMES
a1b2c3d4e5f6   my-hello-world:latest    "npm start"   2 minutes ago  Exited (0) 30 seconds ago             my-hello-world-container
```

### docker start

Start an existing stopped container.

```bash
$ docker start my-hello-world-container
my-hello-world-container
```

### docker stop

Stop a running container gracefully.

```bash
$ docker stop my-hello-world-container
my-hello-world-container
```

### docker stop all containers

Stop every running container at once.

```bash
$ docker stop $(docker ps -q)
a1b2c3d4e5f6
b2c3d4e5f6a7
```

### docker rm

Remove a stopped container.

```bash
$ docker rm my-hello-world-container
my-hello-world-container
```

### docker rm all containers

Remove all stopped containers at once.

```bash
$ docker rm $(docker ps -a -q)
a1b2c3d4e5f6
b2c3d4e5f6a7
```

### docker restart

Restart a running or stopped container.

```bash
$ docker restart my-hello-world-container
my-hello-world-container
```

### docker logs

Show the stdout/stderr logs of a container.

```bash
$ docker logs my-hello-world-container
Server started on port 3000
Connected to Redis
```

### docker logs with filter

Pipe logs through grep to find specific entries.

```bash
$ docker logs caddy 2>&1 | grep "minio"
2026/05/03 10:00:00 minio upstream connected
```

### docker exec

Run an interactive bash shell inside a running container.

```bash
$ docker exec -it my-hello-world-container bash
root@a1b2c3d4e5f6:/app#
```

Use `sh` when the image does not include bash (e.g. Alpine-based images).

```bash
$ docker exec -it my-hello-world-container sh
/app #
```

### docker cp

Copy a file from the host into a container.

```bash
$ docker cp config.yml my-hello-world-container:/app/config.yml
Successfully copied 2.5kB to my-hello-world-container:/app/config.yml
```

Copy a file from a container to the host.

```bash
$ docker cp my-hello-world-container:/app/logs/app.log ./app.log
Successfully copied 4.1kB to ./app.log
```

### docker inspect

Display low-level details about a container or image in JSON format.

```bash
$ docker inspect my-hello-world-container
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

Use `--format` to extract a specific field.

```bash
$ docker inspect --format '{{.NetworkSettings.IPAddress}}' my-hello-world-container
172.17.0.2
```

---

## Images

### docker images

List all locally available images.

```bash
$ docker images
REPOSITORY       TAG       IMAGE ID       CREATED         SIZE
my-hello-world   latest    abc123def456   2 minutes ago   120MB
nginx            latest    789ghi012jkl   3 days ago      187MB
```

### docker rmi

Remove a local image by name or ID.

```bash
$ docker rmi my-hello-world:latest
Untagged: my-hello-world:latest
Deleted: sha256:abc123def456...
```

### Explore an image with a shell

Run an image with an interactive shell as the entrypoint to inspect its filesystem and installed packages.

```bash
$ docker run -it --entrypoint sh restic/restic
/restic #
```

---

## Cleanup

Prune removes unused Docker objects. See [Docker pruning docs](https://docs.docker.com/engine/manage-resources/pruning/).

### docker image prune

Remove dangling images (images not tagged and not referenced by any container).

```bash
$ docker image prune
Deleted Images:
untagged: hello-world@sha256:abc123...
deleted: sha256:def456...
Total reclaimed space: 1.2MB
```

### docker image prune -a

Remove all images not associated with at least one container.

```bash
$ docker image prune -a
Deleted Images:
untagged: nginx:latest
deleted: sha256:789ghi012jkl...
Total reclaimed space: 45.8MB
```

### docker container prune

Remove all stopped containers.

```bash
$ docker container prune
Deleted Containers:
a1b2c3d4e5f6
b2c3d4e5f6a7
Total reclaimed space: 2.3MB
```

### docker volume ls

List all Docker volumes.

```bash
$ docker volume ls
DRIVER    VOLUME NAME
local     my-app-data
local     postgres-data
```

### docker volume prune

Remove volumes not used by at least one container.

```bash
$ docker volume prune
Deleted Volumes:
my-app-data
Total reclaimed space: 50.2MB
```

### docker network ls

List all Docker networks.

```bash
$ docker network ls
NETWORK ID     NAME              DRIVER    SCOPE
a1b2c3d4e5f6   bridge            bridge    local
b2c3d4e5f6a7   host              host      local
c3d4e5f6a7b8   my-app-network    bridge    local
```

### docker network prune

Remove networks not used by any container.

```bash
$ docker network prune
Deleted Networks:
my-app-network
Total reclaimed space: 0B
```

### docker system prune

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

### docker system prune everything including volumes

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

---

## Compose

### docker compose up

Start all services defined in a compose file.

```bash
$ docker compose -f compose.yml up
[+] Running 3/3
 ✔ Network my-app_default  Created
 ✔ Container my-app-web-1  Started
 ✔ Container my-app-db-1   Started
```

### docker compose up detached

Start services in the background.

```bash
$ docker compose -f compose.yml up -d
[+] Running 3/3
 ✔ Network my-app_default  Created
 ✔ Container my-app-web-1  Started
 ✔ Container my-app-db-1   Started
```

### docker compose up force recreate

Force recreate containers even if their configuration has not changed.

```bash
$ docker compose -f compose.yml up -d --force-recreate
[+] Running 2/2
 ✔ Container my-app-web-1  Recreated
 ✔ Container my-app-db-1   Recreated
```

### docker compose down

Stop and remove containers and networks defined in a compose file.

```bash
$ docker compose -f compose.yml down
[+] Running 3/3
 ✔ Container my-app-web-1  Removed
 ✔ Container my-app-db-1   Removed
 ✔ Network my-app_default  Removed
```

### docker compose down with cleanup

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

### docker compose logs

Show logs from all services or a specific container.

```bash
$ docker compose -f compose.yml logs web
my-app-web-1  | Server started on port 3000
my-app-web-1  | Connected to database
```

### docker restart (compose container)

Restart a single container from a compose stack.

```bash
$ docker restart my-app-web-1
my-app-web-1
```

### docker exec in compose container

Open an interactive shell in a running compose container.

```bash
$ docker exec -it my-app-web-1 bash
root@a1b2c3d4e5f6:/app#
```

---

## Remote

### Run commands on a remote Docker host

Use the `DOCKER_HOST` environment variable to target a remote Docker daemon over SSH.

```bash
$ DOCKER_HOST="ssh://proxbox@dockerbox.lan" docker ps
CONTAINER ID   IMAGE          COMMAND       CREATED        STATUS        PORTS     NAMES
a1b2c3d4e5f6   nginx:latest   "/docker-e…"  2 days ago     Up 2 days     80/tcp    web
```

---

## Misc

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
