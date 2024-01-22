FROM node:18.16.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli typescript ts-node
# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port your app will run on
EXPOSE 5003

# Define the command to run your application
CMD ["npm", "run" , "start:dev"]
