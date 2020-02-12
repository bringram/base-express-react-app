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

## Roadmap

- [In Progress] Add a JavaScript based version of the `server` project
- Add Jest test examples for `server-js`
- Add Kubernetes health/liveness/readiness endpoint(s) to server projects
- Add API call example to client projects that call exposed server endpoints
