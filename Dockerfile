FROM node:18
WORKDIR /usr/src/surveylab-api
COPY ./package.json/ .
RUN npm install
