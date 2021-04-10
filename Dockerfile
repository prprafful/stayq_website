FROM node:alpine

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN npm install

COPY ./ ./

# RUN npm run build

EXPOSE 3000

USER node

CMD ["pm2-runtime", "npm", "--", "start"]