FROM --platform=linux/amd64 node:18-alpine  

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY src ./src

COPY tsconfig.json ./tsconfig.json

RUN npm run build

EXPOSE 5050
CMD [ "node", "build/index.js" ]

