FROM node:12.18.1-alpine
WORKDIR /usr/src/app
COPY . .
# RUN apt-get -y update && apt-get install -y
RUN npm install --only=production
CMD npm start