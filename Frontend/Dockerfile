# Use Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy frontend source code
COPY . .

# Expose Vite port
EXPOSE 5173

# Start frontend development server
CMD ["yarn", "dev"]