FROM node:17

WORKDIR /usr/src/app
COPY ./src ./src

COPY package*.json ./
COPY ecosystem.config.js ./
RUN yarn install
EXPOSE 3000

CMD ["npm", "run", "pm2"]