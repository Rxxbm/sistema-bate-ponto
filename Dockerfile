FROM node:18.20-slim

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "tail", "-f", "/dev/null" ]