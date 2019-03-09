FROM node

WORKDIR /splitshare

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/

RUN yarn install --production

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/server/.env.example ./packages/server/
COPY ./packages/server/.env.prod ./packages/server/.env
COPY ./packages/server/ormconfig.json ./packages/server/

WORKDIR ./packages/server

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "dist/index.js"]
