FROM node:21-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --quiet

COPY . .

EXPOSE 4173

CMD [ "npm", "run", "preview" ]