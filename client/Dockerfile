# We share the contents of the base image through almost every build stage below.
# This image is not intended to be built or run directly.
FROM node:10-alpine as base

LABEL org.opencontainers.image.authors=brandongingram@gmail.com
LABEL org.opencontainers.image.title="Base Application React Client"

ENV NODE_ENV=production
EXPOSE 3000
WORKDIR /u01
COPY package*.json ./
RUN npm config list && npm ci && npm cache clean --force
ENV PATH /u01/node_modules/.bin:$PATH


# The development image. Here we install the devDependencies and switch to
# the 'node' user and '/u01/app' directory. No code is copied into this
# stage as it is just being bind mounted via docker-compose.
FROM base as dev
WORKDIR /u01/app


# The test image. This will run all the tests for the application
# after copying in the application code.
FROM dev as test
ENV CI=true
COPY . .
RUN npm test


# The pre-production "build" image. All this essentially does is
# run 'npm run build' to produce an optimized version of the 
# application. The resulting '/u01/app/build' folder is all we
# care about for the production image.
FROM test as pre-prod
RUN npm run build


# The production image. This copies the build folder from the
# 'pre-prod' image into the appropriate location to be served
# from Nginx and sets up a healthcheck.
FROM nginx:1.17-alpine as prod
COPY --from=pre-prod /u01/app/build /usr/share/nginx/html
HEALTHCHECK --interval=5m --timeout=3s CMD curl --fail \
  http://127.0.0.1/ || exit 1
