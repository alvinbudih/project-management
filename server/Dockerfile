FROM node:20.12

WORKDIR /server

ENV PORT=3000

COPY package.json package-lock.json /server/

RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "run", "start"]