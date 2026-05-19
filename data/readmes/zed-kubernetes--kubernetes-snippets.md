# Kubernetes Snippets for Zed

The fastest way to author Kubernetes manifests in Zed. This extension provides intelligent, multi-cursor YAML snippets for common Kubernetes resources, with **zero-config schema validation** baked right in.

## Features

* **Instant Boilerplate:** Type a short prefix (like `k8sdeploy`), hit `Tab`, and generate complete, production-grade Kubernetes manifests instantly.
* **Smart Multi-Cursor:** Tabstops are mirrored. Type your application name once, and it automatically populates `metadata.name`, `matchLabels`, pod template labels, and container name simultaneously.
* **Zero-Config Linting:** Every snippet injects `# yaml-language-server: $schema=kubernetes` at the top. With Zed's built-in YAML language server you get real-time K8s schema validation, hover docs, and field autocomplete—scoped only to files that need it.
* **Production Defaults:** Snippets include security contexts, resource limits, liveness/readiness/startup probes, pod anti-affinity, rolling update strategies, and other hardened defaults out of the box.

## Usage

Open any `.yaml` or `.yml` file in Zed, type one of the prefixes below, and select it from the autocomplete menu (or hit `Tab`).

## Snippets

### Workloads

| Prefix | Resource | Highlights |
|---|---|---|
| `k8sdeploy` | Deployment | Rolling update strategy, all three probe types, pod anti-affinity, security context, resource limits |
| `k8sstatefulset` | StatefulSet | Headless service ref, volumeClaimTemplates, ordered rolling updates, downward API env vars |
| `k8sdaemonset` | DaemonSet | Node-critical priority, control-plane tolerations, node-name env var |
| `k8sjob` | Job | completions, parallelism, backoffLimit, ttlSecondsAfterFinished |
| `k8scronjob` | CronJob | concurrencyPolicy, timeZone, startingDeadlineSeconds, history limits |

### Services & Networking

| Prefix | Resource | Highlights |
|---|---|---|
| `k8ssvc` | ClusterIP Service | Standard internal service |
| `k8ssvcnodeport` | NodePort Service | externalTrafficPolicy: Local |
| `k8ssvclb` | LoadBalancer Service | externalTrafficPolicy: Local, source range allowlist |
| `k8ssvcheadless` | Headless Service | clusterIP: None, publishNotReadyAddresses for StatefulSets |
| `k8singress` | Ingress (NGINX + TLS) | SSL redirect, proxy timeouts, body-size annotations |
| `k8snetpol` | NetworkPolicy | Default-deny with DNS + HTTPS egress allowlist |

### Config & Storage

| Prefix | Resource | Highlights |
|---|---|---|
| `k8sconfigmap` | ConfigMap | Key-value and multi-line file examples |
| `k8ssecret` | Secret (Opaque) | stringData — no base64 required |
| `k8ssecretregistry` | Secret (docker-registry) | Image pull secret |
| `k8spv` | PersistentVolume | hostPath with reclaim policy |
| `k8spvc` | PersistentVolumeClaim | StorageClass binding, access modes |
| `k8sstorageclass` | StorageClass | Provisioner, reclaim policy, volume binding mode |

### RBAC

| Prefix | Resource | Highlights |
|---|---|---|
| `k8sserviceaccount` | ServiceAccount | automountServiceAccountToken: false |
| `k8srole` | Role | Core API + apps group rules |
| `k8srolebinding` | RoleBinding | Bound to ServiceAccount subject |
| `k8sclusterrole` | ClusterRole | Includes nonResourceURLs for /metrics, /healthz |
| `k8sclusterrolebinding` | ClusterRoleBinding | Bound to ServiceAccount subject |

### Autoscaling & Policy

| Prefix | Resource | Highlights |
|---|---|---|
| `k8shpa` | HorizontalPodAutoscaler (v2) | CPU + memory metrics, scaleDown stabilization window |
| `k8spdb` | PodDisruptionBudget | unhealthyPodEvictionPolicy: AlwaysAllow |
| `k8sresourcequota` | ResourceQuota | CPU, memory, pod, service, PVC limits |
| `k8slimitrange` | LimitRange | Container + PVC types, maxLimitRequestRatio |

### Other

| Prefix | Resource | Highlights |
|---|---|---|
| `k8snamespace` | Namespace | metadata.name label for NetworkPolicy selectors, team/env labels |

## Contributing

Pull requests are welcome! Candidates for future snippets:

* `k8svpa` — VerticalPodAutoscaler
* `k8spodsecurity` — PodSecurity admission labels on Namespace
* CRDs: ArgoCD `Application`, Istio `VirtualService` / `DestinationRule`, cert-manager `Certificate`
