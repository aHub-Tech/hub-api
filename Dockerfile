FROM node:alpine AS build

WORKDIR /usr/app

LABEL name="buid"

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:alpine AS production

WORKDIR /usr/app

LABEL name="production"

COPY package*.json ./

RUN npm install --production

COPY --from=build /usr/app/dist ./dist

ENTRYPOINT [ "npm", "run", "start:prod" ]