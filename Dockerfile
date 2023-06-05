FROM node:16
WORKDIR /src/app
COPY package.json package-lock.json
RUN "npm install"
COPY . .
CMD ["npm", "start"]