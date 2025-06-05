FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

# We don't copy the rest of the files here because they'll be mounted as a volume
# This allows for hot-reloading during development

EXPOSE 3000

# Use development command instead of production
CMD ["npm", "run", "dev"]
