FROM node:lts-alpine3.20

WORKDIR /workspaces/bonfire-clicker

# three.js
RUN npm install --save three

# vite
RUN npm install --save-dev vite