FROM node:14

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY src/ .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]
