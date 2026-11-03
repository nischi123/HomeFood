#Use Node.js image
FROM node:22

#Set working directory
WORKDIR /app

#Copy package files
COPY package*.json ./

#Install dependencies
RUN yarn install

#Copy Backend source code

COPY . .

#Expose backend port
EXPOSE 5000

#Start Backend server
CMD ["yarn", "dev"]