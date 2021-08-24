FROM node:lts-alpine
RUN npm i -g pm2

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build