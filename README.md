# Base Express / React App

This project is meant to be used as a basic template for constructing a web-based application using React for the application front-end and Express for the server-side API. This project can be used as a starting point to quickly get up and running when starting a new project.

This project utilizes the JavaScript superset [TypeScript](https://www.typescriptlang.org/) for the `client-ts` and `server-ts` projects. A JavaScript version of the client application has been provided in the `client-js` project.

## Prerequisites

Prior to installing & running the base application images, you will need to have a few things installed.

1. [Git](https://git-scm.com/) - used to clone the application locally and manage changes to the code
2. [Docker](https://www.docker.com/) - used to develop, build and run the application

## Installation

Clone the GitHub repository and use `docker-compose` to build the development images & start them.

```bash
$ git clone https://github.com/bringram/base-express-react-app.git
$ cd base-express-react-app
$ docker-compose up --build
```

After the above initial steps, to run the application in the future, you will only need to run `docker-compose up` to run the application locally.

By default, the `docker-compose.yml` file will build and run the `client-js` and `server-ts` projects. If you wish to instead run the `client-ts` project, you will need to edit the `client` section of the `docker-compose.yml` file and replace it with the below.

```yaml
# The ReactJS client web application
client:
  build:
    context: ./client-ts
    target: dev
  image: base-client:dev
  command: npm start
  ports:
    - 3001:3000
  volumes:
    - ./client-ts:/u01/app
    - /u01/app/node_modules
  labels:
    - traefik.port=3000
    - traefik.frontend.rule=Host:client.localhost
```

## Usage

As this repo is really meant to be a starting point for a new application, the easiest way to get started is to clone this repo locally. After cloning the repo, delete the projects you do not wish to use - only one instance of the `client` and `server` projects are required.

Update the `docker-compose.yml` file if your included projects are different than the ones listed in that file (instructions above). Be sure to also delete the `.git/` folder so you can safely create a repo for your brand new project.

Happy developing!

## K8s & Skaffold Instructions - (For SSR)

> Please have Docker for Desktop installed prior.

> Enable Kubernetes by Docker Desktop App -> Settings -> Kubernetes -> Enable Kubernetes

1. Install **kubectl** - Visit [Kubernetes.io](https://kubernetes.io/docs/tasks/tools/) and install the Kubernetes command-line tool `kubectl`.
2. Install **Skaffold**. We're using [Skaffold](https://skaffold.dev/) for enhancing out local Kubernetes development.
3. We must set up NGINX Ingress Controller to handle load balancing and to act as a reverse proxy. Please visit the [Ingress Nginx](https://kubernetes.github.io/ingress-nginx/deploy/) set-up guide to read further. To set up - run: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml`
4. The route we are using for now is **base-express-react-app.dev**. Since our ingress configuration is looking for that particular route (Configured in `ingress-srv.yml`), we must add this in our `hosts` file as "`127.0.0.1 base-express-react-app.dev`".

   - For Mac OS/Linux --> `/etc/hosts`
   - For Windows --> `C:\Windows\System32\Drivers\etc\hosts`
   - Example:

   ```
     # Added by Docker Desktop
     192.168.1.75 host.docker.internal
     192.168.1.75 gateway.docker.internal
     # To allow the same kube context to work on the host and the container:
     127.0.0.1 kubernetes.docker.internal
     # End of section

     127.0.0.1 base-express-react-app.dev
   ```

   > Note that you can rename this to which ever name you choose depending on your project name (But must be the same in your `ingress-src.yml` file.)

5. Within the root project folder that contains the `skaffold.yml` file - run `skaffold dev` to start it up.
6. Verify the pods are running by executing `kubectl get pods`.
   ```
   client-depl-67965d8648-gjv7k   1/1     Running   0          12m
   server-depl-57d8f7bf9c-xx8xb   1/1     Running   0          12m
   ```

## Roadmap

- Add K8s for Typescript version of the project.
- Add Kubernetes health/liveness/readiness endpoint(s) to server projects
- Add API call example to client projects that call exposed server endpoints
