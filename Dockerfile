FROM node:16
WORKDIR /src/app
COPY . .
RUN "npm install"
CMD ["npm", "start"]