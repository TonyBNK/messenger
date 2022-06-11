FROM node:14.17.3
WORKDIR /messenger
COPY . .
EXPOSE 3000
RUN npm run build
CMD node server.js
