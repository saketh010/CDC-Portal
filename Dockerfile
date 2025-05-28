# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Expose the port your application runs on
EXPOSE 3000

# Set environment variables (optional, or use .env during runtime)
ENV PORT=3000

# Start the application
CMD ["npm", "run", "dev"]
