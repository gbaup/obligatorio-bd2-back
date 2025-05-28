FROM node:22

# Set the working directory
WORKDIR /usr/src/app

RUN npm install -g npm@10

COPY package*.json ./

# Install dependencies including development dependencies
RUN npm install

COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "start:dev"]
