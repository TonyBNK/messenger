FROM ubuntu:20.04
RUN apt update && apt install -y nodejs && apt install -y npm
WORKDIR /var/messenger
COPY ./server.js server.js
EXPOSE 3000
CMD node server.js
