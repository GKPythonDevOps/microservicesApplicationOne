FROM node:12.18.1-alpine
WORKDIR /usr/src/app
COPY . .
# RUN apt-get -y update && apt-get install -y
RUN npm install --only=production
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
# RUN export AWS_ACCESS_KEY_ID=AKIAS5RH2JBRAPEHQ57A
# RUN export AWS_SECRET_ACCESS_KEY=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
# RUN export AWS_DEFAULT_REGION=ap-south-1
# COPY . /src
# COPY ./video ./video
# RUN set AWS_SDK_LOAD_CONFIG=1
CMD npm start