FROM node:latest
WORKDIR  /src/app
COPY package.json .
RUN npm install
COPY . ./
CMD ["/bin/bash", "-c","npm", "start"]