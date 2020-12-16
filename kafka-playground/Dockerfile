FROM node:latest

COPY . /image

WORKDIR /image

RUN npm i

EXPOSE 5000

CMD ["npm", "run", "testbed"]