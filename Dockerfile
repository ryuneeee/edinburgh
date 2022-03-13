FROM node:17

WORKDIR /usr/src/app
COPY ./ ./

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD npm run start:prod