## The Cluster

### Provision Cluster

This application assumes you have a cluster provisioned and up and running. You can do that with Terraform or, if you're using AWS, Eksctl. Check out this [project](https://github.com/KingOfCramers/typeorm-typegrapqhl-api) which is specifically designed to work with this frontend.

This [script](https://github.com/KingOfCramers/typeorm-typegrapqhl-api/blob/master/infrastructure/eksctl/cluster.yaml) specifically will provision a cluster. To apply it, run `eksctl apply -f cluster.yaml`

## Load Balancer

We're relying on AWS ELB (Elastic Load Balancer) to manage traffic to our EKS Cluster. We can install the load balancer using it's Helm chart. You'll need to [install Helm locally](https://helm.sh/docs/intro/install/) in order to use it. Then, with eksctl [targeting](https://github.com/aws/eks-charts/tree/master/stable/aws-load-balancer-controller) target your cluster and run:

1. `helm repo add eks https://aws.github.io/eks-charts`
2. `helm install aws-load-balancer-controller eks/aws-load-balancer-controller --set clusterName=my-cluster -n kube-system`

Then spin up the load balancer: `eksctl apply -f infrastructure/ingress-alb.yaml`

## The Containers

This is quite simple, we just tell kubectl to start up our deployment:`kubectl apply -f infrastructure/deployment.yaml`

This will create our deployment, and the configmap for the nginx server, and the containers themselves for the deployment.

### Redeploys

In order to redeploy an updated version of your application to production, you can rebuild it and then restart your application:

First, rebuild the image: `docker build . --tag yourDockerUsername/ts-react`

Then, restart the deployment: `kubectl rollout restart deployment nginx`
