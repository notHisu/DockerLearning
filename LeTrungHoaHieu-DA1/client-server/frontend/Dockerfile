# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code into the container
COPY . .

# Expose port for the frontend
EXPOSE 3000

# Run the application
CMD ["npm", "start"]