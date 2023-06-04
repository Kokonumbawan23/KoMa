FROM nodejs16
WORKDIR /src/app
COPY . .
RUN "npm install"
CMD ["npm", "start"]