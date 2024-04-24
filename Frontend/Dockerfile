# Stage 1
FROM node:18-alpine as build-stage

WORKDIR /Frontend

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

ARG VITE_APP_API_BASE_URL
ENV VITE_APP_API_BASE_URL=$CLIENT_API_BASE_URL

# Stage 2
FROM nginx:1.17.0-alpine
COPY --from=build-stage /Frontend/dist /usr/share/nginx/html

EXPOSE $VITE_DOCKER_PORT

CMD nginx -g 'daemon off;'