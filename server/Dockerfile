# Use official Node.js image as base
FROM node:10.19.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend directory to the working directory
COPY . .

# Expose port 3000 to access the frontend application
EXPOSE 4006
CMD ["npm", "start"]
