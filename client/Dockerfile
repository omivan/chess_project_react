FROM node:16-alpine
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install
RUN npm install react-scripts

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
