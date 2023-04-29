# create docker file for nestjs application
FROM node:14.15.4-alpine3.12

# set working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# expose port 9000
EXPOSE 9000

# run application
CMD ["npm", "run", "start:dev"]
