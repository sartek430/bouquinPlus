FROM node:21-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --quiet

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "serve" ]