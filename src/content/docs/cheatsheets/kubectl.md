---
title: kubectl
description: Contexts, resources, apply, logs, exec, rollout, scaling, port forwarding, API discovery, auth checks, and cleanup.
---

## kubectl config

Manage kubeconfig contexts, clusters, users, and default namespaces.

### Show the active context

Print the context used by commands that do not pass `--context`.

```bash
$ kubectl config current-context
staging
```

### List available contexts

Show configured contexts and mark the active one with `*`.

```bash
$ kubectl config get-contexts
CURRENT   NAME       CLUSTER    AUTHINFO   NAMESPACE
*         staging    staging    alice      payments
          prod       prod       alice
```

### Switch context

Make a different context active for later commands.

```bash
$ kubectl config use-context prod
Switched to context "prod".
```

### Set the default namespace

Set the namespace for the current context so `-n` is not required every time.

```bash
$ kubectl config set-context --current --namespace=payments
Context "prod" modified.
```

### Show the active kubeconfig slice

Print only the context, cluster, and user settings currently in use.

```bash
$ kubectl config view --minify
apiVersion: v1
clusters:
- cluster:
    server: https://prod.example.com
  name: prod
contexts:
- context:
    cluster: prod
    namespace: payments
    user: alice
  name: prod
current-context: prod
```

## kubectl version

Check kubectl and Kubernetes API server versions.

### Show client version

Print the local kubectl version without contacting the cluster.

```bash
$ kubectl version --client
Client Version: v1.34.1
Kustomize Version: v5.7.1
```

### Show client and server versions

Print both local kubectl and remote API server versions.

```bash
$ kubectl version
Client Version: v1.34.1
Kustomize Version: v5.7.1
Server Version: v1.33.4
```

## kubectl cluster-info

Find cluster service endpoints and collect cluster diagnostics.

### Show cluster endpoints

Print API server and add-on service endpoints.

```bash
$ kubectl cluster-info
Kubernetes control plane is running at https://prod.example.com
CoreDNS is running at https://prod.example.com/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

### Dump cluster diagnostics

Write cluster diagnostic data to a directory for offline inspection.

```bash
$ kubectl cluster-info dump --output-directory=cluster-debug
Cluster info dumped to cluster-debug
```

## kubectl get

List resources and format resource output.

### List pods in the current namespace

Show pod readiness, status, restarts, and age.

```bash
$ kubectl get pods
NAME                   READY   STATUS    RESTARTS   AGE
api-7d9f8c9b7c-x2abc   1/1     Running   0          12m
worker-66f8cc789-jkl9  1/1     Running   1          2h
```

### List pods across namespaces with nodes

Use `-A` for all namespaces and `-o wide` for node and IP details.

```bash
$ kubectl get pods -A -o wide
NAMESPACE   NAME                   READY   STATUS    NODE
payments    api-7d9f8c9b7c-x2abc   1/1     Running   worker-1
kube-system coredns-674b8bbfcf-9q5l 1/1     Running   worker-2
```

### Select resources by label

Filter resources with a label selector.

```bash
$ kubectl get pods -l app=api
NAME                   READY   STATUS    RESTARTS   AGE
api-7d9f8c9b7c-x2abc   1/1     Running   0          12m
```

### Watch workload changes

Watch multiple resource types until interrupted.

```bash
$ kubectl get deploy,pods -w
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/api   2/2     2            2           5d
NAME                       READY   STATUS    RESTARTS   AGE
pod/api-7d9f8c9b7c-x2abc   1/1     Running   0          12m
```

### Print a resource as YAML

Get the full server-side resource object for inspection or export.

```bash
$ kubectl get deployment api -o yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
```

### Print custom columns

Choose exact fields for compact reports.

```bash
$ kubectl get pods -o custom-columns=NAME:.metadata.name,STATUS:.status.phase,NODE:.spec.nodeName
NAME                   STATUS    NODE
api-7d9f8c9b7c-x2abc   Running   worker-1
```

### Sort events by time

Show recent events in chronological order.

```bash
$ kubectl get events --sort-by=.lastTimestamp
LAST SEEN   TYPE      REASON    OBJECT                         MESSAGE
2m          Normal    Pulled    pod/api-7d9f8c9b7c-x2abc       Successfully pulled image
30s         Warning   BackOff   pod/worker-66f8cc789-jkl9      Back-off restarting failed container
```

## kubectl describe

Inspect detailed resource state, related objects, and events.

### Inspect a pod

Show pod scheduling, containers, probes, volumes, and recent events.

```bash
$ kubectl describe pod api-7d9f8c9b7c-x2abc
Name:             api-7d9f8c9b7c-x2abc
Namespace:        payments
Node:             worker-1/10.0.1.20
Containers:
  api:
    Image:        registry.example.com/api:v1
Events:
  Type    Reason   Message
  Normal  Pulled   Successfully pulled image
```

### Inspect a deployment

Show rollout status, replica counts, selector, pod template, and events.

```bash
$ kubectl describe deployment api
Name:                   api
Namespace:              payments
Replicas:               2 desired | 2 updated | 2 available
StrategyType:           RollingUpdate
```

### Inspect a node

Show node capacity, allocatable resources, taints, conditions, and pods.

```bash
$ kubectl describe node worker-1
Name:               worker-1
Roles:              <none>
Taints:             dedicated=batch:NoSchedule
Conditions:
  Ready             True
```

## kubectl logs

Read container logs from pods and workload selectors.

### Read pod logs

Print logs from the default container in a pod.

```bash
$ kubectl logs api-7d9f8c9b7c-x2abc
2026-05-06T10:00:00Z server started on :8080
```

### Follow deployment logs

Stream logs from pods selected by a deployment.

```bash
$ kubectl logs -f deploy/api
2026-05-06T10:00:00Z GET /healthz 200
```

### Read logs from the previous container

Use `--previous` after a container restart or crash.

```bash
$ kubectl logs api-7d9f8c9b7c-x2abc --previous
panic: missing DATABASE_URL
```

### Read logs from all matching containers

Select pods by label and include every container with a prefix.

```bash
$ kubectl logs -l app=api --all-containers=true --prefix
[pod/api-7d9f8c9b7c-x2abc/api] request completed status=200
```

### Limit log volume

Read only recent lines from a recent time window.

```bash
$ kubectl logs deploy/api --tail=100 --since=10m
```

## kubectl exec

Run commands inside containers.

### Open an interactive shell

Start a shell in a running pod.

```bash
$ kubectl exec -it api-7d9f8c9b7c-x2abc -- /bin/sh
/app $
```

### Run a one-off command

Execute a command and print its output locally.

```bash
$ kubectl exec deploy/api -- env
HOSTNAME=api-7d9f8c9b7c-x2abc
PORT=8080
```

### Choose a container

Run a command in a specific container from a multi-container pod.

```bash
$ kubectl exec -it api-7d9f8c9b7c-x2abc -c api -- /bin/sh
```

## kubectl apply

Create or update resources from manifests.

### Apply one manifest

Create or update resources declared in a single file.

```bash
$ kubectl apply -f k8s/deployment.yaml
deployment.apps/api configured
```

### Apply a directory

Apply every manifest in a directory.

```bash
$ kubectl apply -f k8s/
service/api unchanged
deployment.apps/api configured
```

### Validate without persisting

Ask the API server to validate the change without saving it.

```bash
$ kubectl apply -f k8s/ --dry-run=server
service/api configured (server dry run)
deployment.apps/api configured (server dry run)
```

### Use server-side apply

Let the API server manage field ownership for applied manifests.

```bash
$ kubectl apply --server-side -f k8s/
deployment.apps/api serverside-applied
```

## kubectl diff

Preview manifest changes before applying them.

### Compare manifests to live resources

Show the changes `apply` would make.

```bash
$ kubectl diff -f k8s/
diff -u -N /tmp/LIVE-123/apps.v1.Deployment.payments.api /tmp/MERGED-456/apps.v1.Deployment.payments.api
--- /tmp/LIVE-123/apps.v1.Deployment.payments.api
+++ /tmp/MERGED-456/apps.v1.Deployment.payments.api
@@ -40,7 +40,7 @@
-        image: registry.example.com/api:v1
+        image: registry.example.com/api:v2
```

### Compare with server-side apply semantics

Preview changes using server-side field ownership.

```bash
$ kubectl diff -f k8s/deployment.yaml --server-side
```

## kubectl create

Create resources imperatively.

### Create a namespace

Create an empty namespace.

```bash
$ kubectl create namespace dev
namespace/dev created
```

### Create a generic secret

Create a Secret from literal values. Prefer files or a secret manager for sensitive values.

```bash
$ kubectl create secret generic db-creds \
  --from-literal=username=app \
  --from-literal=password='change-me'
secret/db-creds created
```

### Create a config map from files

Create a ConfigMap with keys from files in a directory.

```bash
$ kubectl create configmap app-config --from-file=config/
configmap/app-config created
```

## kubectl set

Update selected fields on existing resources.

### Update a deployment image

Change the container image and trigger a rollout.

```bash
$ kubectl set image deployment/api api=registry.example.com/api:v2
deployment.apps/api image updated
```

### Set environment variables

Add or update environment variables on a workload.

```bash
$ kubectl set env deployment/api FEATURE_FLAG=true
deployment.apps/api env updated
```

### Set container resource requests and limits

Update CPU and memory limits for one container.

```bash
$ kubectl set resources deployment/api -c api --limits=cpu=500m,memory=512Mi
deployment.apps/api resource requirements updated
```

## kubectl rollout

Inspect, restart, and undo workload rollouts.

### Wait for rollout completion

Block until a deployment finishes rolling out.

```bash
$ kubectl rollout status deployment/api
deployment "api" successfully rolled out
```

### Show rollout history

List deployment revisions.

```bash
$ kubectl rollout history deployment/api
deployment.apps/api
REVISION  CHANGE-CAUSE
1         <none>
2         <none>
```

### Restart a deployment

Trigger a new rollout without changing the image.

```bash
$ kubectl rollout restart deployment/api
deployment.apps/api restarted
```

### Undo the latest rollout

Roll back to the previous deployment revision.

```bash
$ kubectl rollout undo deployment/api
deployment.apps/api rolled back
```

## kubectl scale

Set replica counts directly.

### Scale a deployment

Set the desired replica count for a deployment.

```bash
$ kubectl scale deployment/api --replicas=3
deployment.apps/api scaled
```

### Scale a stateful set

Set the desired replica count for a StatefulSet.

```bash
$ kubectl scale statefulset/worker --replicas=2
statefulset.apps/worker scaled
```

## kubectl autoscale

Create HorizontalPodAutoscaler resources.

### Autoscale a deployment by CPU

Create an HPA that scales a deployment between minimum and maximum replicas.

```bash
$ kubectl autoscale deployment api --min=2 --max=10 --cpu-percent=70
horizontalpodautoscaler.autoscaling/api autoscaled
```

## kubectl wait

Block until resources meet a condition.

### Wait for a deployment to become available

Wait until the deployment reports the `available` condition.

```bash
$ kubectl wait --for=condition=available deployment/api --timeout=120s
deployment.apps/api condition met
```

### Wait for selected pods to become ready

Wait for all pods matching a selector to report readiness.

```bash
$ kubectl wait --for=condition=ready pod -l app=api --timeout=60s
pod/api-7d9f8c9b7c-x2abc condition met
```

## kubectl port-forward

Forward local ports to pods and services.

### Forward to a pod

Expose a pod port on your local machine.

```bash
$ kubectl port-forward pod/api-7d9f8c9b7c-x2abc 8080:8080
Forwarding from 127.0.0.1:8080 -> 8080
Forwarding from [::1]:8080 -> 8080
```

### Forward to a service

Expose a service port locally and let Kubernetes choose a backing pod.

```bash
$ kubectl port-forward svc/api 8080:80
Forwarding from 127.0.0.1:8080 -> 8080
```

### Bind on all local interfaces

Allow other machines to reach the forwarded local port.

```bash
$ kubectl port-forward --address 0.0.0.0 svc/api 8080:80
Forwarding from 0.0.0.0:8080 -> 8080
```

## kubectl cp

Copy files between the local machine and containers.

### Copy a file from a pod

Download a file from a container to the local machine.

```bash
$ kubectl cp default/api-7d9f8c9b7c-x2abc:/var/log/app.log ./app.log
tar: Removing leading `/' from member names
```

### Copy a directory to a container

Upload a local directory into a specific container.

```bash
$ kubectl cp ./config default/api-7d9f8c9b7c-x2abc:/tmp/config -c api
```

## kubectl top

Inspect live CPU and memory usage. Requires metrics-server.

### Show pod usage

List pod CPU and memory usage.

```bash
$ kubectl top pods
NAME                   CPU(cores)   MEMORY(bytes)
api-7d9f8c9b7c-x2abc   12m          128Mi
```

### Sort pods by CPU

Find the highest CPU pods first.

```bash
$ kubectl top pods --sort-by=cpu
NAME                   CPU(cores)   MEMORY(bytes)
worker-66f8cc789-jkl9  250m         300Mi
api-7d9f8c9b7c-x2abc   12m          128Mi
```

### Show node usage

List node CPU and memory usage.

```bash
$ kubectl top nodes
NAME       CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
worker-1   620m         31%    2800Mi          45%
```

## kubectl api-resources

Discover supported resource types, API groups, and shortcuts.

### List resource types

Show resources available in the cluster.

```bash
$ kubectl api-resources
NAME          SHORTNAMES   APIVERSION   NAMESPACED   KIND
pods          po           v1           true         Pod
services      svc          v1           true         Service
deployments   deploy       apps/v1      true         Deployment
```

### List namespaced resources

Filter to resource types that live inside namespaces.

```bash
$ kubectl api-resources --namespaced=true
```

### List resources in an API group

Filter by API group.

```bash
$ kubectl api-resources --api-group=apps
NAME          SHORTNAMES   APIVERSION   NAMESPACED   KIND
deployments   deploy       apps/v1      true         Deployment
statefulsets  sts          apps/v1      true         StatefulSet
```

## kubectl explain

Inspect Kubernetes resource schemas.

### Explain a nested field

Show documentation for a field path.

```bash
$ kubectl explain deployment.spec.strategy
KIND:       Deployment
VERSION:    apps/v1

FIELD: strategy <DeploymentStrategy>
```

### Show recursive schema details

Print nested fields under a schema path.

```bash
$ kubectl explain pod.spec.containers --recursive
KIND:       Pod
VERSION:    v1

RESOURCE: containers <[]Container>
  name       <string>
  image      <string>
```

## kubectl auth can-i

Check RBAC permissions for the current or impersonated user.

### Check a permission

Ask whether the current identity can perform an action.

```bash
$ kubectl auth can-i create deployments
yes
```

### Check a service account permission

Impersonate a service account for the permission check.

```bash
$ kubectl auth can-i get pods --as=system:serviceaccount:default:api
no
```

### List allowed actions

Print permissions granted to the current identity.

```bash
$ kubectl auth can-i --list
Resources      Non-Resource URLs   Resource Names   Verbs
pods           []                  []               [get list watch]
deployments    []                  []               [get list watch create update patch delete]
```

## kubectl patch

Patch live resources without editing full manifests.

### Patch a replica count

Apply a small strategic merge patch.

```bash
$ kubectl patch deployment api -p '{"spec":{"replicas":3}}'
deployment.apps/api patched
```

### Patch image pull secrets

Attach an image pull secret to a service account.

```bash
$ kubectl patch serviceaccount default -p '{"imagePullSecrets":[{"name":"regcred"}]}'
serviceaccount/default patched
```

## kubectl delete

Delete resources by file, name, or selector.

### Delete resources from a manifest

Remove resources declared in a file.

```bash
$ kubectl delete -f k8s/job.yaml
job.batch "data-migration" deleted
```

### Delete one pod

Delete a pod and let its controller replace it if managed.

```bash
$ kubectl delete pod api-7d9f8c9b7c-x2abc
pod "api-7d9f8c9b7c-x2abc" deleted
```

### Delete resources by label

Delete all matching resources in the current namespace.

```bash
$ kubectl delete pods -l app=api
pod "api-7d9f8c9b7c-x2abc" deleted
pod "api-7d9f8c9b7c-mn123" deleted
```

## kubectl debug

Create temporary debugging containers or node debug sessions.

### Add an ephemeral container to a pod

Start a temporary container that shares process namespaces with a target container when supported.

```bash
$ kubectl debug -it pod/api-7d9f8c9b7c-x2abc --image=busybox --target=api
Targeting container "api". If you don't see processes from this container it may be because the container runtime doesn't support this feature.
If you don't see a command prompt, try pressing enter.
/ #
```

### Debug a node

Start a privileged debug pod on a node.

```bash
$ kubectl debug node/worker-1 -it --image=busybox
Creating debugging pod node-debugger-worker-1-abcd with container debugger on node worker-1.
/ #
```

## kubectl label

Add or update labels used for selection, scheduling, and organization.

### Label a node

Mark a node for selectors or operational grouping.

```bash
$ kubectl label node worker-1 nodepool=general
node/worker-1 labeled
```

### Overwrite a label

Use `--overwrite` when a label key already exists.

```bash
$ kubectl label namespace payments owner=platform --overwrite
namespace/payments labeled
```

## kubectl taint

Control whether pods can schedule onto nodes.

### Add a node taint

Prevent pods without a matching toleration from scheduling on a node.

```bash
$ kubectl taint nodes worker-1 dedicated=batch:NoSchedule
node/worker-1 tainted
```

### Remove a node taint

Remove a taint by appending `-` to the full taint key and effect.

```bash
$ kubectl taint nodes worker-1 dedicated=batch:NoSchedule-
node/worker-1 untainted
```

## kubectl cordon

Mark nodes unschedulable before maintenance.

### Prevent new pods on a node

Stop new pods from scheduling onto a node without evicting existing pods.

```bash
$ kubectl cordon worker-1
node/worker-1 cordoned
```

## kubectl drain

Evict workloads from nodes before maintenance.

### Drain a worker node

Evict pods managed by controllers and ignore DaemonSet pods.

```bash
$ kubectl drain worker-1 --ignore-daemonsets --delete-emptydir-data
node/worker-1 cordoned
Warning: ignoring DaemonSet-managed Pods: kube-system/cilium-abcde
pod/api-7d9f8c9b7c-x2abc evicted
node/worker-1 drained
```

## kubectl uncordon

Return nodes to normal scheduling after maintenance.

### Allow scheduling on a node

Mark a drained or cordoned node schedulable again.

```bash
$ kubectl uncordon worker-1
node/worker-1 uncordoned
```

## Pod troubleshooting workflow

Combine resource state, events, and logs when a pod is unhealthy.

### Collect pod diagnostics

Run the quick inspection path before changing the workload.

```bash
$ kubectl get pod api-7d9f8c9b7c-x2abc -o wide
$ kubectl describe pod api-7d9f8c9b7c-x2abc
$ kubectl logs api-7d9f8c9b7c-x2abc --previous
$ kubectl get events --sort-by=.lastTimestamp
```

## Service routing workflow

Check Services, Endpoints, and EndpointSlices when traffic does not reach pods.

### Verify service backends

Confirm the Service selector resolves to ready backend addresses.

```bash
$ kubectl get svc api
$ kubectl get endpoints api
$ kubectl get endpointslice -l kubernetes.io/service-name=api
$ kubectl describe svc api
```

---

## Popular use cases

Use `kubectl` with shell tools to inspect workloads, filter logs, and test cluster access.

### Restart a deployment and watch rollout

Trigger a rollout restart, then wait for it to finish.

```bash
$ kubectl rollout restart deploy/api
$ kubectl rollout status deploy/api
deployment "api" successfully rolled out
```

### Tail logs and filter errors

Stream deployment logs and keep only error lines.

```bash
$ kubectl logs -f deploy/api | grep -i error
ERROR database connection failed
ERROR retry limit reached
```

### List unhealthy pods

Filter a pod list for common failure states.

```bash
$ kubectl get pods -A | grep -E "CrashLoopBackOff|Error|ImagePullBackOff"
default   api-7d9f8c9b7c-x2abc   0/1   CrashLoopBackOff   5   10m
```

### Tabulate pod status with jq

Convert Kubernetes JSON into a compact table.

```bash
$ kubectl get pods -A -o json | jq -r '.items[] | [.metadata.namespace, .metadata.name, .status.phase] | @tsv'
default	api-7d9f8c9b7c-x2abc	Running
kube-system	coredns-668d6bf9bc	Running
```

### Port-forward and test with curl

Forward a Service locally, then hit its health endpoint from another terminal.

```bash
$ kubectl port-forward svc/api 8080:80
Forwarding from 127.0.0.1:8080 -> 80

$ curl -i http://localhost:8080/health
HTTP/1.1 200 OK
```
