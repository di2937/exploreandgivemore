# This file has been adapted from https://www.bacancytechnology.com/blog/dockerize-react-app
# @author: Rik Ghosh

# pull the official base image
FROM node:18

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH to ensure
# these binaries are found when running in image
ENV PATH /app/node_modules/.bin:$PATH

# copy application dependencies
COPY package.json ./
COPY package-lock.json ./

# update Linux package manager
RUN apt-get update

# update npm
RUN npm install --version
RUN npm install -g npm@latest

# install dependencies
RUN npm install

# listen on port 3000 for React
EXPOSE 3000

# copy app 
COPY . ./

# start app
CMD ["npm", "start"]
