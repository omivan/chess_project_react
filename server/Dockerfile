FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
RUN ls -la
EXPOSE 5000
CMD ["node", "Server.js"]
