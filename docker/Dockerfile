FROM node:lts-alpine3.20

# Install packages
RUN apk add --no-cache git

WORKDIR /workspaces/bonfire-clicker

# NPM dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install