FROM node:16

# Create app directory
WORKDIR /

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ["package*.json", "./"]     
RUN npm install
COPY . .
EXPOSE 3050
CMD ["npm", "start"]