# Stage 1
FROM node:8 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM nginx:1.13.19-alpine

COPY --from=builder /usr/src/app/dist/d-minute-front /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
