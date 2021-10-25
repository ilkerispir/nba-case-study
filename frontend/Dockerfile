FROM node:16

RUN mkdir -p usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install -g serve

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "-l", "3000", "./build"]