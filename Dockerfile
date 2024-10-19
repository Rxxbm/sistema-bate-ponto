FROM node:18.20-alpine

WORKDIR /home/node/app

RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
