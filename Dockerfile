FROM node:latest

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
