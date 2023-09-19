FROM node:18.17.1

WORKDIR /var/www/orchestrator

COPY package*.json /var/www/orchestrator

RUN npm install 

COPY ./ ./

EXPOSE 4000

CMD ['node', 'index.js']
