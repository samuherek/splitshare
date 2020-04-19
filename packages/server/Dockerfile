FROM node:12-alpine

WORKDIR /app

COPY /package.json .

RUN yarn install --production

COPY /dist ./dist
COPY /.env.production ./.env.production

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "dist/index.js"]
