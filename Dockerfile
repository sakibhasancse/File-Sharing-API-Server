FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm install --production
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]