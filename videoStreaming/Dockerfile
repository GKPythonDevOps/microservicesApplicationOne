FROM node:12.18.1-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install --only=production
# COPY . /src
# COPY ./video ./video
CMD npm start