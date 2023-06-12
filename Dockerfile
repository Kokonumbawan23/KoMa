FROM node:latest
WORKDIR  /src/app
COPY package.json .

ENV accessTokenSecretKey = "test"
ENV MAIL_EMAIL="testing.repo.it@gmail.com"
ENV MAIL_HOST = "smtp.gmail.com"
ENV MAIL_PASSWORD="pfojaeyvgvrafyjr"
ENV AES_ENCRYPT_KEY="test123tes234"

RUN npm install
COPY . ./
CMD npm start