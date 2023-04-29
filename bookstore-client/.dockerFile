# create docker file for nextjs application
FROM node:14.15.4-alpine3.12

# set working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# expose port 3000
EXPOSE 3000

# run application
CMD ["npm", "run", "start:dev"]
