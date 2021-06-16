FROM node:12-alpine as build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN yarn install
COPY . . 
RUN yarn run build

FROM bitnami/nginx
COPY --from=build /usr/src/app/build /app
EXPOSE 80