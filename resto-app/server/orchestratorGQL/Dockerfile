FROM node:18.17.1

WORKDIR /var/www/orchestrator

COPY package*.json .

RUN npm install 

COPY ./ ./

EXPOSE 4000

CMD ['npx', 'nodemon', 'index.js']
