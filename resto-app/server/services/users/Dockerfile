FROM node:18.17.1

WORKDIR /var/www/services/user

COPY package*.json ./

RUN npm install 

COPY ./ ./

EXPOSE 4001

CMD ['npx', 'nodemon', 'index.js']
