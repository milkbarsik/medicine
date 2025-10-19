FROM node:20-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --non-interactive --pure-lockfile
COPY . .

RUN yarn build


FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./

RUN corepack enable && yarn install --non-interactive --production --pure-lockfile


COPY --from=build /app/dist ./dist
EXPOSE 5050

CMD ["sh","-c","true && node dist/index.js"]