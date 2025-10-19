FROM node:20-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --non-interactive --pure-lockfile
COPY . .

RUN yarn build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80