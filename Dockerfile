# Stage 1
FROM node:8.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM nginx:1.14.1-alpine

COPY --from=node /usr/src/app/dist/angular-docker /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
