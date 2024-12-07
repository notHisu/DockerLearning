# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the backend's port
EXPOSE 80

# Run the application
CMD ["node", "app.js"]
