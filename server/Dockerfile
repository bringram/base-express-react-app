# We share the contents of the base image through every build stage below.
# This image is not intended to be built or run directly.
FROM node:10-alpine as base

LABEL org.opencontainers.image.authors=brandongingram@gmail.com
LABEL org.opencontainers.image.title="Base Application Express Server"
LABEL org.opencontainers.nodeversion=$NODE_VERSION

ENV NODE_ENV=production
EXPOSE 3000
WORKDIR /u01
COPY --chown=node:node package*.json ./
RUN npm config list && npm ci && npm cache clean --force
ENV PATH /u01/node_modules/.bin:$PATH
RUN mkdir app && chown -R node:node .
CMD ["node", "src/server.js"]


# The development image. Here we install the devDependencies and switch to
# the 'node' user and '/u01/app' directory. No code is copied into this
# stage as it is just being bind mounted via docker-compose.
FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development && npm cache clean --force
WORKDIR /u01/app


# The test image. This will run all the tests for the application as well
# as the 'npm audit' command and security scans.
FROM dev as test
COPY --chown=node:node . .
RUN npm audit


# The pre-production "clean-up" image. All this essentially does is
# remove the 'node_modules' from the image (the base image contains
# what we need already). It also removes the test source files.
# This image is not intended to be built or run directly.
FROM test as pre-prod
RUN rm package*.json && rm -rf ../node_modules


# The production image. This copies the code from the 'pre-prod' image
# sets up a healthcheck, switches to the 'node' user and '/u01/app'
# directory.
FROM base as prod
COPY --from=pre-prod /u01/app /u01/app
WORKDIR /u01/app
HEALTHCHECK CMD curl http://127.0.0.1/ || exit 1
USER node
