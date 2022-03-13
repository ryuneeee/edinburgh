FROM node:17

WORKDIR /usr/src/app
COPY ./src ./src

COPY package*.json ./
RUN yarn install
EXPOSE 3000

CMD ["yarn", "start:prod"]