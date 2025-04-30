FROM node:20 AS front-builder
COPY package.json yarn.lock ./
RUN yarn install
RUN mkdir /react-ui
RUN mv ./node_modules ./react-ui
WORKDIR /react-ui
COPY . .
RUN yarn run build
