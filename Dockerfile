FROM node:8.9.1
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 8000
CMD npm start