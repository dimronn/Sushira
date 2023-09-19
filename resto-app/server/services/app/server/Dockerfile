FROM node:18.17.1

WORKDIR /var/www/services/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 4002

CMD ['npx', 'nodemon', 'app.js']
