FROM node:alpine

WORKDIR /bits/server

ENV DB_HOST=db

COPY package*.json .

RUN npm install
COPY . .

RUN npm run build
COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start"]