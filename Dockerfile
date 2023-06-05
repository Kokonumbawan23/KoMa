FROM node:20-alpine
WORKDIR /src/app
COPY package.json .
RUN "npm --verbose install"
COPY . .
CMD ["npm", "start"]